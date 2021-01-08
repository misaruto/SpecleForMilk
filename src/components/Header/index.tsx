import React from 'react';
import {Image, StatusBar} from 'react-native';
import {View} from '../Themed';
import styles from './styles';
import logoImg from '../../assets/images/smallLogo.png';

const Header = () => {
  return (
    <View
      lightColor="#1682C2"
      darkColor="#1662ff"
      style={
        (styles.header,
        {
          top: StatusBar.currentHeight,
          marginBottom: StatusBar.currentHeight ? StatusBar.currentHeight : 20,
        })
      }>
      <Image source={logoImg} style={styles.logoImage} />
      {/* {props.text && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      )} */}
    </View>
  );
};

export default Header;
