import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

const MainStack = createStackNavigator();

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="App">
      <MainStack.Screen name="App" component={DrawerNavigator} />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
