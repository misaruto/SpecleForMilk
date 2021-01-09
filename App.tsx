/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import Routes from './src/routes';
import SplashScreen from 'react-native-splash-screen';
import ThemeProvider from './src/contexts/ThemeContext';
import useCachedResources from './src/hooks/useCachedResources';
import {AuthProvider} from './src/contexts/AuthContext';
const App = () => {
  const isLoadingComplete = useCachedResources();

  return (
    <AuthProvider>
      {isLoadingComplete && SplashScreen.hide() ? (
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      ) : null}
    </AuthProvider>
  );
};

export default App;
