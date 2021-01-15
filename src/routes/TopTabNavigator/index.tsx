import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {TopTabParamList, NewNavigatorParamList} from '../../../types';
import NewRead from '../../screens/NewRead';
import Home from '../../screens/Home';
import History from '../../screens/History';
import {ThemeContext} from '../../contexts/ThemeContext';
import Colors from '../../constants/Colors';
import AuthContext from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator<TopTabParamList>();

export default function TopTabNavigator() {
  const {theme} = React.useContext(ThemeContext);
  const {setShowSpinner} = React.useContext(AuthContext);
  const navigation = useNavigation();
  React.useEffect(() => {
    if (navigation.isFocused()) {
      setShowSpinner(false);
    }
  }, [navigation, setShowSpinner]);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: theme === 'dark' ? '#1662ff' : '#1682C2',
        inactiveTintColor: theme === 'dark' ? 'gray' : '#212121',
        showIcon: false,
        pressColor: Colors[theme].tabBarPressColor,
        indicatorStyle: {
          backgroundColor: Colors[theme].tabBarPressColor,
        },
        indicatorContainerStyle: {
          flex: 1,
        },
        contentContainerStyle: {
          backgroundColor: Colors[theme].background,
          textAlign: 'center',
        },
        iconStyle: {
          alignSelf: 'center',
          flex: 0,
          alignItems: 'center',
          padding: 0,
          margin: 0,
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',
          tabBarAccessibilityLabel: 'Pagina inicial',
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              size={20}
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
          tabBarAccessibilityLabel: 'Pagina histórico de leituras',
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
          tabBarAccessibilityLabel: 'Pagina nova leitura',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              size={23}
              name={focused ? 'plus-circle' : 'plus-circle-outline'}
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
// const HomeStack = createStackNavigator<HomeParamList>();

// function HomeNavigator() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="Home"
//         component={Home}
//         options={{headerShown: false}}
//       />
//     </HomeStack.Navigator>
//   );
// }
// const HistoryStack = createStackNavigator<HistoryParamList>();

// function HistoryNavigator() {
//   return (
//     <HistoryStack.Navigator>
//       <HistoryStack.Screen
//         name="History"
//         component={History}
//         options={{headerShown: false}}
//       />
//     </HistoryStack.Navigator>
//   );
// }

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
