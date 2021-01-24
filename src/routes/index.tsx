import React, {useCallback, useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';
import {ActivityIndicator} from 'react-native';
import linking from './linking';
import RootNavigator from './RootNavigator';
import UnAuthNavigator from './UnAuthNavigator';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation() {
  const {loading, signed, getLoggedIn} = useContext(AuthContext);

  const start = useCallback(async () => {
    await getLoggedIn();
  }, [getLoggedIn]);
  useEffect(() => {
    start();
  }, [start]);

  return (
    <NavigationContainer linking={linking}>
      {loading ? (
        <ActivityIndicator />
      ) : signed ? (
        <RootNavigator />
      ) : (
        <UnAuthNavigator />
      )}
    </NavigationContainer>
  );
}
