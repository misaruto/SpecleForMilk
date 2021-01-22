import React from 'react';
import {View} from '../../components/Themed';

import UserInfoItem from '../../components/UserInfoItem';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import LeituraContainer from '../../components/LeituraContainer';

function Home() {
  const laticionios = {
    nome: 'Laticínios IF Sudeste MG',
    cidade: 'Rio Pomba',
    uf: 'MG',

    imgUri:
      'https://maiseducacao.uai.com.br/wp-content/uploads/sites/4/2019/06/if-sudeste-mg-instituto-federal-de-educacao-ciencia-e-tecnologia-do-sudeste-de-minas-950x714.jpg',
  };
  const leitura = [
    {
      nome: 'Proteína',
      valor: '3,25',
      unidade: '%',
    },
    {
      nome: 'Gordura',
      valor: '3,67',
      unidade: '%',
    },
    {
      nome: 'CCS',
      valor: '290.000',
      unidade: 'Cel/ml',
    },
    {
      nome: 'CBT',
      valor: '300.000',
      unidade: 'UFC/ml',
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* <UserInfoItem user={user} /> */}
          <UserInfoItem user={laticionios} />
        </View>
        <LeituraContainer
          data="12/11/2020"
          leituras={leitura}
          layout="cardsLayout"
        />
      </ScrollView>
    </View>
  );
}

export default Home;
