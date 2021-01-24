import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {Text} from '../Themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import logoImg from '../../assets/images/smallLogo.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useColors} from '../../contexts/ThemeContext';
interface Header {
  name?: string;
  back: boolean;
  drawerButton: boolean;
}

const Header: React.FC<Header> = ({name, back, drawerButton}) => {
  const navigation = useNavigation();
  const colors = useColors();
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
      style={
        (styles.header,
        {
          top: StatusBar.currentHeight,
          backgroundColor: colors.primary,
        })
      }>
      <View style={styles.logoContainer}>
        {drawerButton && (
          <View style={styles.drawerButtonContainer}>
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={handleOpenDrawer}>
              <MaterialCommunityIcons name="menu" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        {back && (
          <View style={styles.backAndTextContainer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleGoBack}>
                <MaterialCommunityIcons
                  name="arrow-left-thick"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
            </View>
          </View>
        )}
        {!back && name === undefined && (
          <View
            style={(styles.logoContainer, {backgroundColor: colors.primary})}>
            <Image source={logoImg} style={styles.logoImage} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;
