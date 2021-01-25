import React, {useCallback, useEffect, useState} from 'react';

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

import {Text, TouchableOpacity, View} from '../../../components/Themed';
import styles from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import AsyncStorage from '@react-native-community/async-storage';
import {useSpinner, useTheme} from '../../../contexts/ThemeContext';
import {useLogout, useUser} from '../../../contexts/AuthContext';

function DrawerContent(props: DrawerContentComponentProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const {changeTheme, theme} = useTheme();
  const logout = useLogout();
  const user = useUser();
  const {setSpinner} = useSpinner();
  const updateSwitchThemes = useCallback(async () => {
    setIsDarkTheme(theme === 'dark');
  }, [theme]);

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

  const navigateToConfigurations = () => {
    props.navigation.navigate('Settings');
  };

  useEffect(() => {
    updateSwitchThemes();
  }, [updateSwitchThemes, user]);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: user.profileImage,
                }}
              />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Title style={styles.title}>
                  <Text>
                    {user.name
                      ? user.name.replace("'", '').replace("'", '')
                      : ''}
                  </Text>
                </Title>
                <Caption>
                  <Text>
                    <SimpleLineIcons name="location-pin" size={14} />
                    {user.metaInfo && typeof user.metaInfo !== 'string'
                      ? ' ' + user.metaInfo.cidade + ' - ' + user.metaInfo.uf
                      : ''}
                  </Text>
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section>
            <Text style={{marginLeft: 6, marginTop: 4}}>Preferencias</Text>
            <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preference}>
                <Text style={{fontSize: 20, marginLeft: 4}}>Tema Escuro</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section>
            <TouchableOpacity onPress={navigateToConfigurations}>
              <View style={styles.preference}>
                <Text style={{fontSize: 20, marginLeft: 4}}>Configurações</Text>
                <SimpleLineIcons
                  size={23}
                  name="settings"
                  color={isDarkTheme ? '#fff' : '#000'}
                />
              </View>
            </TouchableOpacity>
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
            setSpinner({isVisible: true, isCancelable: false});
            logout();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;
