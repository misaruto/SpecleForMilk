import React, {useContext, useEffect, useState} from 'react';

import {useForm} from 'react-hook-form';

import styles from './styles';
import Input, {InputErrorProps} from '../../components/Input';
import {View} from '../../components/Themed';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Link from '../../components/Link';
import {ILoginData} from '../../../types';
import AuthContext, {useUserAuthentication} from '../../contexts/AuthContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSpinner} from '../../contexts/ThemeContext';

function Login() {
  const navigation = useNavigation();
  const route = useRoute();
  const handleAuthentication = useUserAuthentication();
  const {setSigned} = useContext(AuthContext);
  const spinner = useSpinner();
  const {register, handleSubmit, setValue} = useForm();

  const [loginError, setLoginError] = useState<InputErrorProps>({
    isError: false,
    msg: undefined,
  });
  const [passwdError, setPasswdError] = useState<InputErrorProps>({
    isError: false,
    msg: undefined,
  });

  const handleSubmitForm = async (data: ILoginData) => {
    if (data.login && data.password) {
      spinner.setIsVisible(true);
      spinner.setIsCancelable(true);
      await handleAuthentication(data).then((result) => {
        if (result) {
          setSigned(true);
        } else {
          spinner.setIsVisible(false);
          spinner.setIsCancelable(true);
          setLoginError({isError: true, msg: undefined});
          setPasswdError({
            isError: true,
            msg: 'Usuário ou senha incorretos',
          });
        }
      });
    } else {
      if (!data.login) {
        setLoginError({isError: true, msg: 'Campo obrigatório'});
      }
      if (!data.password) {
        setPasswdError({isError: true, msg: 'Campo obrigatório'});
      }
    }
  };

  const handleNavigateRecovery = () => {
    navigation.navigate('RecoveryPassword');
  };
  useEffect(() => {
    register('login');
    register('password');
  }, [register]);

  useEffect(() => {
    if (navigation.isFocused()) {
      spinner.setIsVisible(false);
    }
  }, [navigation, route, spinner]);

  return (
    <View style={styles.container}>
      <View style={styles.formLoginContainer}>
        <Input
          name="login"
          placeHolder="Login"
          onChangeText={(text) => setValue('login', text)}
          onTouchStart={() => {
            setTimeout(() => {
              setLoginError({
                isError: false,
                msg: undefined,
              });
            }, 2000);
          }}
          error={loginError}
        />
        <Input
          name="password"
          placeHolder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => setValue('password', text)}
          onTouchStart={() => {
            setTimeout(() => {
              setPasswdError({
                isError: false,
                msg: undefined,
              });
            }, 2000);
          }}
          error={passwdError}
        />
        <Button label="Login" onPress={handleSubmit(handleSubmitForm)}>
          <Icon name="login" size={30} color="white" />
        </Button>

        <Link label="Recuperar a senha" onPress={handleNavigateRecovery} />
        <Link label={'Não é cliente? \nveja nossas ofertas'} />
      </View>
    </View>
  );
}

export default Login;
