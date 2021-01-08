import AsyncStorage from '@react-native-community/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {Text as DefaultText, View as DefaultView} from 'react-native';
import {
  TouchableOpacity as DefaultTouchableOpacity,
  ScrollView as DefaultScrollView,
} from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';
import {ThemeContext} from '../../contexts/ThemeContext';

export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const {theme} = useContext(ThemeContext);

  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity['props'];

export type ScrollView = ThemeProps & DefaultScrollView['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );
  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function ScrollView(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );
  return (
    <DefaultScrollView style={[{backgroundColor}, style]} {...otherProps} />
  );
}

export function Label(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'labelLeitura',
  );
  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'touchableOpacity',
  );
  return (
    <DefaultTouchableOpacity style={[{backgroundColor}, style]} {...otherProps}>
      {otherProps.children}
    </DefaultTouchableOpacity>
  );
}

export function ThemedLink(props: TouchableOpacityProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );
  return (
    <DefaultTouchableOpacity style={[{backgroundColor}, style]} {...otherProps}>
      {otherProps.children}
    </DefaultTouchableOpacity>
  );
}
