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

import ThemeProvider from './src/contexts/ThemeContext';
import useCachedResources from './src/hooks/useCachedResources';
import {AuthProvider} from './src/contexts/AuthContext';
import {ActivityIndicator} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const App = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  } else {
    return (
      <ThemeProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    );
  }
};

export default App;
