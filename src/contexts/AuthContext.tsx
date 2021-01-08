import React from 'react';
import {createContext, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';
import api from '../services/api';
import {ILoginData, IUser} from '../../types';
import AsyncStorage from '@react-native-community/async-storage';
interface AuthContextData {
  signed: boolean;
  token: string;
  user: object | null;
  logIn(_data: ILoginData): Promise<void>;
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
      .post('authenticateUser', {
        email: data.login,
        password: data.password,
      })
      .then(async (response: AxiosResponse<ILoginResponse>) => {
        if (response.data.ok) {
          setToken(response.data.cookie);
          await AsyncStorage.setItem('@RNAuth:token', response.data.cookie);
          const loggedUser: AxiosResponse<IUser> = await api.get('userInfo', {
            headers: {'X-auth-cookie': token},
          });
          setUser(loggedUser.data);
          await AsyncStorage.setItem(
            '@RNAuth:user',
            JSON.stringify(loggedUser.data),
          );
        }
      });
  }
  const getLogedIn = useCallback(async () => {
    const localToken = await AsyncStorage.getItem('@RNAuth:token');
    if (localToken !== null) {
      setToken(localToken);
      setSigned(true);
    } else {
      setSigned(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{signed, user, logIn, token}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
