import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ColorSchemeName} from 'react-native';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.

export const ThemeContext = React.createContext({
  theme: 'light' as NonNullable<ColorSchemeName>,
  changeTheme(_newTheme: NonNullable<ColorSchemeName>) {},
});

function ThemeProvider({children}) {
  const [theme, setTheme] = useState('dark' as NonNullable<ColorSchemeName>);
  const changeTheme = useCallback((newTheme: NonNullable<ColorSchemeName>) => {
    setTheme(newTheme);
  }, []);
  const topBarBgColor = {light: '#1682C2', dark: '#1662ff'};

  const getTheme = useCallback(async () => {
    const oldTheme = await AsyncStorage.getItem('theme');
    if (oldTheme !== null) {
      changeTheme(oldTheme as NonNullable<ColorSchemeName>);
    } else {
      changeTheme('dark');
    }
  }, [changeTheme]);

  useEffect(() => {
    getTheme();
  }, [getTheme]);
  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={topBarBgColor[theme]}
        translucent={true}
        animated={true}
      />
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
