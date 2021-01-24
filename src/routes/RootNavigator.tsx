import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import MainStackScreen from './MainNavigator';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={MainStackScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
