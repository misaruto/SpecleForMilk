import React, {
  MutableRefObject,
  useRef,
  createContext,
  useCallback,
  useState,
} from 'react';
import {AxiosResponse} from 'axios';
import api from '../services/api';
import {
  IUser,
  ILogoutResponse,
  IUserInfo,
  ILoginData,
  IAuthResponse,
} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import metaInfoParser from '../utils/metaInfoParser';

interface AuthContextData {
  loading: boolean;
  signed: boolean;
  token: MutableRefObject<string>;
  user: IUser;
  setSigned(_logged: boolean): void;
  logOut(): Promise<void>;
  getLoggedIn(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<IUser>({} as IUser);
  const [signed, setSigned] = useState(false);
  const token = useRef('');

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

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed,
        user,
        token,
        logOut,
        getLoggedIn,
        setSigned,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
