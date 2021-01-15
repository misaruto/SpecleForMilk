import React, {useCallback, useContext, useEffect, useRef} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList, UnAuthStackParamList} from '../../types';
import Login from '../screens/Login';
import DrawerNavigator from './DrawerNavigator';
import Header from '../components/Header';
import AuthContext from '../contexts/AuthContext';
import {ActivityIndicator} from 'react-native';
import Register from '../screens/Register';
import RecoveryPassword from '../screens/RecoveryPassword';
import linking from './linking';

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

const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="App">
      <MainStack.Screen name="App" component={DrawerNavigator} />
    </MainStack.Navigator>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={MainStackScreen} />
    </Stack.Navigator>
  );
}
const UnAuthStack = createStackNavigator<UnAuthStackParamList>();

function UnAuthNavigator() {
  return (
    <UnAuthStack.Navigator
      screenOptions={{
        header: () => {
          return <Header drawerButton={false} back={false} />;
        },
      }}>
      <UnAuthStack.Screen
        name="Login"
        key="Login"
        component={Login}
        options={{
          header: () => {
            return <Header drawerButton={false} back={false} />;
          },
        }}
      />
      <UnAuthStack.Screen name="Register" component={Register} />
      <UnAuthStack.Screen
        name="RecoveryPassword"
        key="RecoveryPassword"
        options={{
          header: () => {
            return (
              <Header drawerButton={false} back={true} name="Recuperar Senha" />
            );
          },
        }}
        component={RecoveryPassword}
      />
    </UnAuthStack.Navigator>
  );
}
