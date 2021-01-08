import React from "react";
import { Text } from "react-native";
import {
  TouchableOpacity,
  TouchableOpacityProps as ThemedTouchableOpacityProps,
  useThemeColor,
} from "../Themed";
import styles from "./styles";

interface Props {
  label: string;
}
export type ButtonProps = Props & ThemedTouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{label}</Text>
      {rest.children}
    </TouchableOpacity>
  );
};

export default Button;
