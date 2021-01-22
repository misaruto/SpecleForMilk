import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ColorSchemeName} from 'react-native';
import Colors from '../constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay';

export interface ISpinnerProps {
  isVisible: boolean;
  setIsVisible(_visible: boolean): void;
  isCancelable: boolean;
  setIsCancelable(_cancelable: boolean): void;
}

export const ThemeContext = React.createContext({
  theme: 'light' as NonNullable<ColorSchemeName>,
  changeTheme(_newTheme: NonNullable<ColorSchemeName>) {},
  spinner: {} as ISpinnerProps,
});

export const useColors = () => {
  const {theme} = React.useContext(ThemeContext);
  return Colors[theme];
};

export const useSpinner = () => {
  const {spinner} = React.useContext(ThemeContext);

  return spinner;
};

const ThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState('dark' as NonNullable<ColorSchemeName>);
  const [isVisible, setIsVisible] = useState(false);
  const [isCancelable, setIsCancelable] = useState(true);

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
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        spinner: {isVisible, setIsVisible, isCancelable, setIsCancelable},
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={topBarBgColor[theme]}
        translucent={true}
        animated={true}
      />
      <Spinner
        visible={isVisible}
        textContent="Carregando..."
        overlayColor={Colors[theme].primary}
        cancelable={isCancelable}
      />
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
