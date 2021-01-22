import AsyncStorage from '@react-native-community/async-storage';
import {AxiosResponse} from 'axios';
import {useContext} from 'react';
import {Alert} from 'react-native';
import {IAuthResponse, ILoginData} from '../../types';
import AuthContext from '../contexts/AuthContext';
import api from '../services/api';

/******** This custom hook handle the authentication of user *********/

const useUserAuthenticate = async (data: ILoginData): Promise<boolean> => {
  //Cath the mutable token of context
  const {token} = useContext(AuthContext);
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
        await AsyncStorage.setItem('@RNAuth:token', response.data.cookie).catch(
          (reason) => {
            throw {msg: 'Error when saving user access token reason:', reason};
          },
        );
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      //Alerta o usuario em caso de não conseguir fazer a requisição http para api
      Alert.alert('Erro ao fazer login, verifique sua conexão com a internet');
      return false;
    });
  return result;
};

export default useUserAuthenticate;
