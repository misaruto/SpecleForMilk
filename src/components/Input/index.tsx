import React from 'react';

import {TextInput, TextInputProps, Text} from 'react-native';
import Colors from '../../constants/Colors';
import {useColors} from '../../contexts/ThemeContext';
import {View} from '../Themed';
import styles from './styles';
export interface InputErrorProps {
  isError: boolean;
  msg?: string;
}
interface Props extends TextInputProps {
  name: string;
  placeHolder?: string;
  error: InputErrorProps;
}

const Input: React.FC<Props> = ({name, placeHolder, error, ...rest}) => {
  const colors = useColors();
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={
          (styles.input,
          {
            backgroundColor: colors.background,
            borderColor: error.isError ? colors.textError : colors.text,
            borderBottomWidth: 1,
            fontSize: 22,
            alignSelf: 'center',
            width: '86%',
            color: colors.text,
          })
        }
        placeholderTextColor={colors.text}
        placeholder={placeHolder}
        {...rest}
      />
      {error.isError && error.msg && (
        <Text
          style={
            (styles.inputError,
            {
              marginTop: 2,
              alignSelf: 'center',
              textAlign: 'center',
              width: '86%',
              height: 28,
              color: colors.textError,
            })
          }>
          {error.msg}
        </Text>
      )}
    </View>
  );
};
export default Input;
