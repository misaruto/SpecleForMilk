import React, {
  MutableRefObject,
  useRef,
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import {AxiosResponse} from 'axios';
import api from '../services/api';
import {
  IAuthResponse,
  ILoginData,
  ILogoutResponse,
  IUser,
  IUserInfo,
} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';
import metaInfoParser from '../utils/metaInfoParser';
import {Alert} from 'react-native';

interface AuthContextData {
  loading: boolean;
  signed: boolean;
  token: MutableRefObject<string>;
  user: IUser;
  handleAuthentication(data: ILoginData): Promise<boolean>;
  handleLogout(): void;
  setUser(_user: IUser): void;
  setSigned(_logged: boolean): void;
  getLoggedIn(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const getUserInfo = async (cookie: string) => {
  const loggedUser: IUserInfo = await api
    .get('users/getUserInfo', {
      headers: {Cookie: 'uid=' + cookie},
    })
    .then((response: AxiosResponse<IUserInfo>) => {
      if (response.status === 200 && response.data.ok) {
        return response.data || ({} as IUserInfo);
      } else {
        return {} as IUserInfo;
      }
    })
    .catch(() => {
      throw Error('verifique sua conexão com a internet');
    });

  return loggedUser.data;
};
export const useUserAuthentication = () => {
  const {handleAuthentication} = useContext(AuthContext);
  return handleAuthentication;
};

export const useLogout = () => {
  const {handleLogout} = useContext(AuthContext);
  return handleLogout;
};
export const AuthProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [signed, setSigned] = useState(false);
  const token = useRef('');

  const handleAuthentication = async (data: ILoginData): Promise<boolean> => {
    //Made a request to api passing the user credential
    const result = await api
      .post('users/authenticateUser', {
        email: data.login,
        password: data.password,
      })
      .then(async (response: AxiosResponse<IAuthResponse>) => {
        /*response, if the user passed the correct credentials response.data.ok is true,
      if not response.data.ok is false*/
        if (response.data.ok) {
          /*This line pass the token from api (where it is named cookie) for the context;
        At this point user still seeing the spinner*/
          token.current = response.data.cookie;
          //Stores user access token
          await AsyncStorage.setItem(
            '@RNAuth:token',
            response.data.cookie,
          ).catch((reason) => {
            throw {msg: 'Error when saving user access token reason:', reason};
          });
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        //Alerta o usuario em caso de não conseguir fazer a requisição http para api
        Alert.alert(
          'Erro ao fazer login, verifique sua conexão com a internet',
        );
        return false;
      });
    return result;
  };

  const handleLogout = async () => {
    await api
      .get('users/logout', {
        headers: {Cookie: 'uid=' + token.current},
      })
      .then(async (response: AxiosResponse<ILogoutResponse>) => {
        if (response.status === 200 && response.data.ok) {
          token.current = '';
          setUser({} as IUser);
          setSigned(false);
          await AsyncStorage.clear();
        } else {
          Alert.alert('Erro ao sair');
        }
      })
      .catch(() => {
        Alert.alert('Sem internet, impossível fazer logout');
      });
  };

  const getLoggedIn = useCallback(async () => {
    const localToken = await AsyncStorage.getItem('@RNAuth:token');
    if (localToken !== null) {
      token.current = localToken;
      setSigned(true);
      const localUser = await AsyncStorage.getItem('@RNAuth:user');
      if (localUser !== null) {
        let userObj: IUser = JSON.parse(localUser);
        if (userObj) {
          setUser(userObj);
        } else {
          const loggedUser = await getUserInfo(token.current);
          if (typeof loggedUser.metaInfo === 'string') {
            loggedUser.metaInfo = metaInfoParser(loggedUser.metaInfo);
          }
          await AsyncStorage.setItem(
            '@RNAuth:user',
            JSON.stringify(loggedUser),
          );
          setUser(loggedUser);
        }
      } else {
        const loggedUser = await getUserInfo(token.current);
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(loggedUser));
        setUser(loggedUser);
      }
    } else {
      setSigned(false);
    }
    setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed,
        user,
        token,
        setUser,
        getLoggedIn,
        setSigned,
        handleLogout,
        handleAuthentication,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
