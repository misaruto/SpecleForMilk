import React from 'react';

import {View, Text} from '../Themed';
import styles from './styles';
export interface ILeituraItem {
  nome: string;
  unidade: string;
  valor: string;
}

export interface ILeitura {
  leitura: ILeituraItem;
}
const LeituraItem: React.FC<ILeitura> = ({leitura}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leituraValorContainer}>
        <Text style={styles.valor}>
          {leitura.valor}
          <Text style={styles.unidade}>{leitura.unidade}</Text>
        </Text>
      </View>
      <View style={styles.leituraNomeContainer}>
        <Text style={styles.leituraNome}>{leitura.nome}</Text>
      </View>
    </View>
  );
};

export default LeituraItem;
