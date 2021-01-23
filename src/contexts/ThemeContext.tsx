import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ColorSchemeName} from 'react-native';
import Colors from '../constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay';

export interface ISpinnerProps {
  isVisible: boolean;
  isCancelable: boolean;
}

export const ThemeContext = React.createContext({
  theme: 'light' as NonNullable<ColorSchemeName>,
  changeTheme(_newTheme: NonNullable<ColorSchemeName>) {},
  spinner: {} as ISpinnerProps,
  setSpinner(_newSpinnerState: ISpinnerProps) {},
});

export const useColors = () => {
  const {theme} = React.useContext(ThemeContext);
  return Colors[theme];
};

export const useTheme = () => {
  const {theme, changeTheme} = React.useContext(ThemeContext);
  return {theme, changeTheme, colors: Colors[theme]};
};
export const useSpinner = () => {
  const {spinner, setSpinner} = React.useContext(ThemeContext);

  return {spinner, setSpinner};
};

const ThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState('dark' as NonNullable<ColorSchemeName>);
  const [spinner, setSpinner] = useState({
    isVisible: false,
    isCancelable: true,
  });
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
        spinner,
        setSpinner,
      }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={topBarBgColor[theme]}
        translucent={true}
        animated={true}
      />
      <Spinner
        visible={spinner.isVisible}
        textContent="Carregando..."
        textStyle={{color: Colors[theme].text}}
        color={Colors[theme].primary}
        overlayColor={Colors[theme].background + 'aa'}
        cancelable={spinner.isCancelable}
      />
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
