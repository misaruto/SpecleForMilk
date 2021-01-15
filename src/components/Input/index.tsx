import React from 'react';

import {TextInput, TextInputProps, Text} from 'react-native';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../contexts/ThemeContext';
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
  const {theme} = React.useContext(ThemeContext);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={
          (styles.input,
          {
            backgroundColor: Colors[theme].background,
            borderColor: error.isError
              ? Colors[theme].textError
              : Colors[theme].text,
            borderBottomWidth: 1,
            fontSize: 22,
            alignSelf: 'center',
            width: '86%',
            color: Colors[theme].text,
          })
        }
        keyboardAppearance={theme}
        placeholderTextColor={Colors[theme].text}
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
              color: Colors[theme].textError,
            })
          }>
          {error.msg}
        </Text>
      )}
    </View>
  );
};
export default Input;
