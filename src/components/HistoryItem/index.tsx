import React from "react";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import styles from "./styles";

export interface IHistoryItem {
  id: string;
  data: string;
  hora: string;
}
export interface IHistory {
  history: IHistoryItem;
}

const HistoryItem: React.FC<IHistory> = ({ history }, ...props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} darkColor="#225B7B">
        <Text style={styles.title} lightColor="#fff">
          Leitura do dia {history.data} as {history.hora}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryItem;
