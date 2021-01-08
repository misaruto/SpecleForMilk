import React from 'react';

import {View, Text, Label} from '../Themed';
import styles from './styles';
export interface ILeituraItem {
  nome: string;
  unidade: string;
  valor: string;
}

export interface IUser {
  leitura: ILeituraItem;
}
const LeituraItem: React.FC<IUser> = ({leitura}) => {
  return (
    <View style={styles.container}>
      <Label style={styles.leituraNomeContainer}>
        <Text style={styles.leituraNome}>{leitura.nome}</Text>
      </Label>
      <View style={styles.leituraValorContainer}>
        <Text style={styles.valor}>
          {leitura.valor}
          <Text style={styles.unidade}>{leitura.unidade}</Text>
        </Text>
      </View>
    </View>
  );
};

export default LeituraItem;
