import AsyncStorage from '@react-native-community/async-storage';
import {AxiosResponse} from 'axios';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {IAuthResponse, ILoginData} from '../../types';
import AuthContext from '../contexts/AuthContext';
import api from '../services/api';
const useUserAuthenticate = async (data: ILoginData): Promise<boolean> => {
  const {token} = useContext(AuthContext);
  const result = await api
    .post('users/authenticateUser', {
      email: data.login,
      password: data.password,
    })
    .then(async (response: AxiosResponse<IAuthResponse>) => {
      if (response.data.ok) {
        token.current = response.data.cookie;
        await AsyncStorage.setItem('@RNAuth:token', response.data.cookie);
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      Alert.alert('Erro ao fazer login, verifique sua conexão com a internet');
      return false;
    });
  return result;
};

export default useUserAuthenticate;
