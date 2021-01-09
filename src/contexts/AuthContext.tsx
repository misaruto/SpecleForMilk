import React, {useEffect} from 'react';
import {createContext, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';
import api from '../services/api';
import {ILoginData, IUser, ILogoutResponse} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';
interface AuthContextData {
  signed: boolean;
  token: string;
  user: object | null;
  logIn(_data: ILoginData): Promise<void>;
  logOut(): Promise<void>;
  getLoggedIn(): Promise<void>;
}

export interface ILoginResponse {
  ok: boolean;
  err?: string;
  cookie?: any;
}
export interface IUserInfo {
  ok: boolean;
  data?: IUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);
  const [signed, setSigned] = useState(false);
  const [token, setToken] = useState('');
  async function logIn(data: ILoginData) {
    await api
      .post('users/authenticateUser', {
        email: data.login,
        password: data.password,
      })
      .then(async (response: AxiosResponse<ILoginResponse>) => {
        console.log(response);
        if (response.data.ok) {
          setToken(response.data.cookie);
          await AsyncStorage.setItem('@RNAuth:token', response.data.cookie);
          if (token.length > 0) {
            const loggedUser: AxiosResponse<IUser> = await api.get(
              'users/getUserInfo',
              {
                headers: {Cookie: 'uid=' + token},
              },
            );
            setUser(loggedUser.data);
            await AsyncStorage.setItem(
              '@RNAuth:user',
              JSON.stringify(loggedUser.data),
            );
          }
        }
      });
  }
  async function logOut() {
    await api
      .get('users/logout', {
        headers: {Cookie: 'uid=' + token},
      })
      .then(async (response: AxiosResponse<ILogoutResponse>) => {
        if (response.data.ok) {
          setToken('');
          setUser({});
          setSigned(false);
          AsyncStorage.clear();
        }
      });
  }
  const getLoggedIn = useCallback(async () => {
    const localToken = await AsyncStorage.getItem('@RNAuth:token');
    if (localToken !== null) {
      setToken(localToken);
      setSigned(true);
      const localUser = await AsyncStorage.getItem('@RNAuth:user');
      if (localUser !== null) {
        setUser(JSON.parse(localUser));
      } else {
        const loggedUser: IUser = await api
          .get('users/getUserInfo', {
            headers: {Cookie: 'uid=' + token},
          })
          .then((response: AxiosResponse<IUser>) => {
            return response.data || {name: '', email: '', metaInfo: ''};
          })
          .catch((err) => {
            console.log(err);
            return {name: '', email: '', metaInfo: ''};
          });
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(loggedUser));
        setUser(loggedUser);
      }
    } else {
      setSigned(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{signed, user, logIn, token, logOut, getLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
