import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useColors} from '../../contexts/ThemeContext';
import {Text} from '../Themed';

import styles from './styles';

interface Props {
  label?: string;
  icon?: React.ReactNode;
}
export type ButtonProps = Props & TouchableOpacity['props'];
/**
 * This button has a standard style sheet,
 * but you can spend all your modifications as children
 * it is not recommended to pass the icon and label and also pass children,
 *  use only one of these
 * */
const Button: React.FC<ButtonProps> = ({label, icon, ...props}) => {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={
        label
          ? {...styles.defaultButton, backgroundColor: colors.primary}
          : styles.button
      }
      {...props}>
      {label && (
        <Text
          style={{...styles.defaultLabel, color: colors.defaultButtonLabel}}>
          {label}
        </Text>
      )}
      {icon}
      {props.children}
    </TouchableOpacity>
  );
};

export default Button;
