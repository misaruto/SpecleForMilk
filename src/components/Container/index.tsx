import React, { Children } from "react";
import { ViewProps } from "react-native";

import { View } from "../Themed";
import styles from "./styles";

const Container: React.FC<ViewProps> = (props) => {
  return (
    <View {...props} style={styles.container}>
      {props.children}
    </View>
  );
};
export default Container;
