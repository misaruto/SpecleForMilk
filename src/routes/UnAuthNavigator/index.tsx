import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Header from '../../components/Header';
import {UnAuthStackParamList} from '../../../types';
import Login from '../../screens/Login';
import RecoveryPassword from '../../screens/RecoveryPassword';
import Register from '../../screens/Register';

const UnAuthStack = createStackNavigator<UnAuthStackParamList>();

const UnAuthNavigator: React.FC = () => {
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
};
export default UnAuthNavigator;
