import React, {useEffect, useState} from 'react';

import {useForm} from 'react-hook-form';

import styles from './styles';
import Input from '../../components/Input';
import {View} from '../../components/Themed';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Link from '../../components/Link';
import {useNavigation} from '@react-navigation/native';

import Spinner from 'react-native-loading-spinner-overlay';
import {ILoginData} from '../../../types';

function Login() {
  const [showSpinner, setShowSpinner] = useState(false);

  const {register, handleSubmit, setValue} = useForm();

  const handleSubmitForm = async (data: ILoginData) => {
    setShowSpinner(true);
  };

  useEffect(() => {
    register('login');
    register('password');
  }, [register]);
  return (
    <View style={styles.container}>
      <Spinner
        visible={showSpinner}
        color="#1682C2"
        size="large"
        animation="slide"
        overlayColor="#000000aa"
        textContent="Carregando..."
        textStyle={{color: '#fff'}}
      />
      <View style={styles.formLoginContainer}>
        <Input
          name="login"
          placeHolder="Login"
          onChangeText={(text) => setValue('login', text)}
        />
        <Input
          name="password"
          placeHolder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => setValue('password', text)}
        />
        <Button label="Login" onPress={handleSubmit(handleSubmitForm)}>
          <Icon name="login" size={30} color="white" />
        </Button>

        <Link label="Recuperar a senha" />
        <Link label={'Não é cliente? \nveja nossas ofertas'} />
      </View>
    </View>
  );
}

export default Login;
