import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {ColorSchemeName, useColorScheme as _useColorScheme} from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const [theme, setTheme] = React.useState(_useColorScheme());
  async function handleToggleTheme() {
    const storageTheme = await AsyncStorage.getItem('theme');
    const localTheme =
      storageTheme !== null && storageTheme === 'dark' ? 'dark' : 'light';
    setTheme(localTheme);
  }
  React.useEffect(() => {
    handleToggleTheme();
  }, [AsyncStorage.getItem('theme')]);
  return theme as NonNullable<ColorSchemeName>;
}
