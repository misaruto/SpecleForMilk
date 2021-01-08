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
declare const global: {HermesInternal: null | {}};
const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    SplashScreen.hide();
    return (
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    );
  }
};

export default App;
