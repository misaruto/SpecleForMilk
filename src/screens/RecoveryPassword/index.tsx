import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Button from '../../components/Button';
import Input, {InputErrorProps} from '../../components/Input';
import {Text, View} from '../../components/Themed';
import AuthContext from '../../contexts/AuthContext';
import api from '../../services/api';
import styles from './styles';

function RecoveryPassword() {
  const navigation = useNavigation();
  const {setShowSpinner} = useContext(AuthContext);
  const {register, handleSubmit, setValue} = useForm();
  const [emailError, setEmailError] = useState<InputErrorProps>({
    isError: false,
    msg: undefined,
  });

  const handleSubmitForm = async (data: FormData) => {
    if (data.login && data.password) {
      setShowSpinner(true);
      const result = await api.post('users/changeUserPassword', {
        email: data.email,
      });
      if (result) {
      } else {
        await setShowSpinner(false);

        setEmailError({isError: true, msg: 'Email inválido'});
      }
    } else {
      if (!data.email) {
        setEmailError({isError: true, msg: 'Campo obrigatório'});
      }
    }
  };

  useEffect(() => {
    register('email');
  }, [register]);

  useEffect(() => {
    if (navigation.isFocused()) {
      setShowSpinner(false);
    }
  }, [navigation, setShowSpinner]);
  return (
    <View style={styles.container}>
      <View style={styles.formLoginContainer}>
        <Input
          name="email"
          placeHolder="Email"
          onChangeText={(text) => setValue('email', text)}
          onTouchStart={() => {
            setTimeout(() => {
              setEmailError({
                isError: false,
                msg: undefined,
              });
            }, 2000);
          }}
          error={emailError}
        />

        <Button
          label="Enviar Codigo"
          onPress={handleSubmit(handleSubmitForm)}
        />
      </View>
    </View>
  );
}

export default RecoveryPassword;
