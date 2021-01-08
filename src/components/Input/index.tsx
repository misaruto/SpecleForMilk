import React, {Ref, RefObject} from 'react';

import {TextInput, TextInputProps, Text} from 'react-native';
import Colors from '../../constants/Colors';
import {ThemeContext} from '../../contexts/ThemeContext';
import {View} from '../Themed';
import styles from './styles';

interface Props extends TextInputProps {
  name: string;
  placeHolder?: string;
  error?: string;
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
            borderColor: Colors[theme].text,
            borderBottomWidth: 1,
            fontSize: 28,
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
      {error && <Text style={styles.inputError}>{error}</Text>}
    </View>
  );
};
export default Input;
