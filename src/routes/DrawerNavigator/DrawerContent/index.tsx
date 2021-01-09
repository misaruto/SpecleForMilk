import React, {useContext, useState} from 'react';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {
  Avatar,
  Caption,
  Drawer,
  Switch,
  Title,
  TouchableRipple,
} from 'react-native-paper';

import {Text, View} from '../../../components/Themed';
import styles from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import AsyncStorage from '@react-native-community/async-storage';
import {ThemeContext} from '../../../contexts/ThemeContext';
import AuthContext from '../../../contexts/AuthContext';

function DrawerContent(props: DrawerContentComponentProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const {changeTheme} = useContext(ThemeContext);
  const {logOut} = useContext(AuthContext);
  if (props.navigation.isFocused()) {
    updateSwitchThemes();
  }
  async function updateSwitchThemes() {
    setIsDarkTheme((await AsyncStorage.getItem('theme')) === 'dark');
  }
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);

    if (!isDarkTheme) {
      changeTheme('dark');
      AsyncStorage.setItem('theme', 'dark');
    } else {
      changeTheme('light');
      AsyncStorage.setItem('theme', 'light');
    }
  };

  const user = {
    nome: 'José Francisco Maia',
    cidade: 'Mercês',
    uf: 'MG',

    imgUri:
      'https://github.com/misaruto/Vackathon-mobile/blob/main/src/assets/images/jose.png?raw=true',
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: user.imgUri,
                }}
              />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Title style={styles.title}>
                  <Text>{user.nome}</Text>
                </Title>
                <Caption>
                  <Text>
                    <SimpleLineIcons name="location-pin" size={14} />
                    {user.cidade} - {user.uf}
                  </Text>
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section>
            <Text style={{marginLeft: 6}}>Preferencias</Text>
            <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preference}>
                <Text style={{fontSize: 20, marginLeft: 4}}>Tema Escuro</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label={() => <Text>Sair</Text>}
          icon={({size}) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={isDarkTheme ? '#fff' : '#000'}
              size={size}
            />
          )}
          onPress={() => {
            logOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;
