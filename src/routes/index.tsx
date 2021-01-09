import React, {useContext} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList, UnAuthStackParamList} from '../../types';
import Login from '../screens/Login';
import DrawerNavigator from './DrawerNavigator';
import Header from '../components/Header';
import AuthContext from '../contexts/AuthContext';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation() {
  const auth = useContext(AuthContext);
  return (
    <NavigationContainer>
      {auth.signed ? <RootNavigator /> : <UnAuthNavigator />}
    </NavigationContainer>
  );
}

const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{header: Header}}
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
      screenOptions={{header: Header}}
      initialRouteName="Login">
      <UnAuthStack.Screen name="Login" component={Login} />
    </UnAuthStack.Navigator>
  );
}
