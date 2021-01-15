import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import Settings from '../../screens/Settings';
import TopTabNavigator from '../TopTabNavigator';
import Header from '../../components/Header';

function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  // const {changeSpinner} = useContext(AuthContext);
  // changeSpinner(false);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        header: () => {
          return <Header drawerButton={true} back={false} />;
        },
      }}>
      <Drawer.Screen name="TopTabNavigator" component={TopTabNavigator} />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          header: () => {
            return (
              <Header drawerButton={false} back={true} name="Configurações" />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
