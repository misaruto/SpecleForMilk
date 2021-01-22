import React from 'react';
import LeituraItem, {ILeituraItem} from '../LeituraItem';
import {Text, View} from '../Themed';
import styles from './styles';
export interface ILeituraContainer {
  layout: 'linesLayout' | 'cardsLayout';
  leituras: ILeituraItem[];
  data: string;
}

const LeituraContainer: React.FC<ILeituraContainer> = ({
  data,
  layout,
  leituras,
}) => {
  const style = styles[layout];
  return (
    <View style={style.ultimaLeituraContainer}>
      <Text style={style.ultimaLeituraTitle}>
        Ultima Leitura
        <Text style={style.ultimaLeituraData}>{data}</Text>
      </Text>
      <View style={style.leituraContainer}>
        {leituras.map((l) => (
          <LeituraItem key={l.nome} leitura={l} />
        ))}
      </View>
    </View>
  );
};

export default LeituraContainer;
