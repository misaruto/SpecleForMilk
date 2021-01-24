import React, {useState} from 'react';
import Input, {InputErrorProps} from '../../components/Input';
import {ScrollView, View} from '../../components/Themed';

const Register: React.FC = () => {
  const [passwdError, setPasswdError] = useState<InputErrorProps>({
    isError: false,
    msg: undefined,
  });
  return (
    <ScrollView>
      <Input
        name="password"
        placeHolder="Senha"
        secureTextEntry={true}
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
    </ScrollView>
  );
};

export default Register;
