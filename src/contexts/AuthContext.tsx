import React, {
  MutableRefObject,
  useRef,
  createContext,
  useCallback,
  useState,
} from 'react';
import {AxiosResponse} from 'axios';
import api from '../services/api';
import {ILoginData, IUser, ILogoutResponse, IMetaInfo} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {Alert} from 'react-native';
interface AuthContextData {
  loading: boolean;
  signed: boolean;
  token: MutableRefObject<string>;
  user: IUser;
  showSpinner: boolean;
  setShowSpinner(_show: boolean): void;
  setSigned(_logged: boolean): void;
  logIn(_data: ILoginData): Promise<boolean>;
  logOut(): Promise<void>;
  getLoggedIn(): Promise<void>;
}

export interface IAuthResponse {
  ok: boolean;
  err?: string;
  cookie?: any;
}
export interface IUserInfo {
  ok: boolean;
  data: IUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [signed, setSigned] = useState(false);
  const token = useRef('');

  const metaInfoParser = (toConvert: string): IMetaInfo => {
    let result: IMetaInfo = {} as IMetaInfo;
    let a = toConvert.replace("'", '').replace("'", '').split(',');
    a.map((b) => {
      let c = b.split(':');
      result = {...result, [c[0]]: c[1]};
    });
    return result;
  };
  const getUserInfo = useCallback(async (cookie: string) => {
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
  }, []);

  const logIn = async (data: ILoginData): Promise<boolean> => {
    changeSpinner(true);
    const result = await api
      .post('users/authenticateUser', {
        email: data.login,
        password: data.password,
      })
      .then(async (response: AxiosResponse<IAuthResponse>) => {
        if (response.data.ok) {
          token.current = response.data.cookie;
          await AsyncStorage.setItem('@RNAuth:token', response.data.cookie);

          let loggedUser = await getUserInfo(token.current);
          if (typeof loggedUser.metaInfo === 'string') {
            loggedUser.metaInfo = metaInfoParser(loggedUser.metaInfo);
          }
          setUser(loggedUser);
          await AsyncStorage.setItem(
            '@RNAuth:user',
            JSON.stringify(loggedUser),
          );
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        changeSpinner(false);
        Alert.alert(
          'Erro ao fazer login, verifique sua conexão com a internet',
        );
        return false;
      });
    return result;
  };
  async function logOut() {
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
        setShowSpinner(false);
      });
  }
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
  }, [token, getUserInfo]);

  const changeSpinner = useCallback((show: boolean) => {
    setShowSpinner(show);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed,
        user,
        token,
        logOut,
        getLoggedIn,
        setShowSpinner,
        showSpinner,
        logIn,
        setSigned,
      }}>
      <Spinner
        visible={showSpinner}
        color="#1682C2"
        size="large"
        animation="slide"
        overlayColor="#000000aa"
        textContent="Carregando..."
        textStyle={{color: '#fff'}}
      />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
