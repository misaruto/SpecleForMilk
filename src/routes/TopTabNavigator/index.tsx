import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {
  TopTabParamList,
  HomeParamList,
  HistoryParamList,
  NewNavigatorParamList,
} from '../../../types';
import NewRead from '../../screens/NewRead';
import Settings from '../../screens/Settings';
import Home from '../../screens/Home';
import History from '../../screens/History';
import {ThemeContext} from '../../contexts/ThemeContext';
import Colors from '../../constants/Colors';

const Tab = createMaterialTopTabNavigator<TopTabParamList>();

export default function TopTabNavigator() {
  const {theme} = React.useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        bounces: true,
        activeTintColor: theme === 'dark' ? '#1662ff' : '#1682C2',
        inactiveTintColor: theme === 'dark' ? 'gray' : '#212121',
        showIcon: true,
        contentContainerStyle: {backgroundColor: Colors[theme].background},
        iconStyle: {alignSelf: 'center', flex: 0.5, width: 30, height: 10},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Inicio',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              size={23}
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          title: 'Histórico',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons size={23} name="history" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewNavigator"
        component={NewNavigator}
        options={{
          title: 'Novo',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              size={23}
              name={focused ? 'plus-circle' : 'plus-circle-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              size={23}
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
const HistoryStack = createStackNavigator<HistoryParamList>();

function HistoryNavigator() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
    </HistoryStack.Navigator>
  );
}

const NewStack = createStackNavigator<NewNavigatorParamList>();
function NewNavigator() {
  return (
    <NewStack.Navigator initialRouteName="NewRead">
      <NewStack.Screen
        name="NewRead"
        component={NewRead}
        options={{headerShown: false}}
      />
    </NewStack.Navigator>
  );
}
