import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {ThemeContext} from '../contexts/ThemeContext';
import useColorScheme from './useColorScheme';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const {changeTheme} = React.useContext(ThemeContext);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, [changeTheme]);

  return isLoadingComplete;
}
