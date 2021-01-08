import React from 'react';
import {Text, View} from '../../components/Themed';

import UserInfoItem from '../../components/UserInfoItem';
import Header from '../../components/Header';

import styles from './styles';
import LeituraItem from '../../components/LeituraItem';
import useColorScheme from '../../hooks/useColorScheme';

function Home(props: any) {
  const user = {
    nome: 'José Francisco Maia (eu)',
    cidade: 'Mercês',
    uf: 'MG',

    imgUri:
      'https://github.com/misaruto/Vackathon-mobile/blob/main/src/assets/images/jose.png?raw=true',
  };
  const laticionios = {
    nome: 'Laticínios IF Sudeste MG',
    cidade: 'Rio Pomba',
    uf: 'MG',

    imgUri:
      'https://maiseducacao.uai.com.br/wp-content/uploads/sites/4/2019/06/if-sudeste-mg-instituto-federal-de-educacao-ciencia-e-tecnologia-do-sudeste-de-minas-950x714.jpg',
  };
  const leitura = {
    nome: 'Proteína',
    valor: '3,25',
    unidade: '%',
    data: '12/11/2020',
  };
  const leitura2 = {
    nome: 'Gordura',
    valor: '3,67',
    unidade: '%',
    data: '12/11/2020',
  };
  const leitura3 = {
    nome: 'CCS',
    valor: '290.000',
    unidade: 'Cel/ml',
    data: '12/11/2020',
  };

  const leitura4 = {
    nome: 'CBT',
    valor: '300.000',
    unidade: 'UFC/ml',
    data: '12/11/2020',
  };
  return (
    <View style={styles.container}>
      <View>
        <UserInfoItem user={user} />
        <UserInfoItem user={laticionios} />
      </View>
      <View style={styles.ultimaLeituraContainer}>
        <Text style={styles.ultimaLeituraTitle}>
          Ultima Leitura
          <Text style={styles.ultimaLeituraData}>{leitura.data}</Text>
        </Text>
        <LeituraItem leitura={leitura} />
        <LeituraItem leitura={leitura2} />
        <LeituraItem leitura={leitura3} />
        <LeituraItem leitura={leitura4} />
      </View>
    </View>
  );
}

export default Home;
