import React from 'react';
import {Image, StatusBar} from 'react-native';
import {Text, View} from '../Themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import logoImg from '../../assets/images/smallLogo.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions, useNavigation} from '@react-navigation/native';
interface Header {
  name?: string;
  back: boolean;
  drawerButton: boolean;
}

const Header: React.FC<Header> = ({name, back, drawerButton}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('app');
    }
  };
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

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
      <View
        style={styles.logoContainer}
        lightColor="#1682C2"
        darkColor="#1662ff">
        {drawerButton && (
          <View
            lightColor="#1682C2"
            darkColor="#1662ff"
            style={styles.drawerButtonContainer}>
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={handleOpenDrawer}>
              <MaterialCommunityIcons name="menu" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        {back && (
          <View
            lightColor="#1682C2"
            darkColor="#1662ff"
            style={styles.backAndTextContainer}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>

            <Text style={styles.title}>{name}</Text>
          </View>
        )}
        {!back && name === undefined && (
          <View
            style={styles.logoContainer}
            lightColor="#1682C2"
            darkColor="#1662ff">
            <Image source={logoImg} style={styles.logoImage} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;
