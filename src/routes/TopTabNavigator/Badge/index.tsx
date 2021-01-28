import React from 'react';

import {Text, View} from '../../../components/Themed';
import {useColors} from '../../../contexts/ThemeContext';
import styles from './styles';

const Badge: React.FC = () => {
  const colors = useColors();
  return (
    <View style={{...styles.badge, backgroundColor: colors.badgeBackground}}>
      <Text style={{...styles.badgeText, color: colors.badgeText}}>1</Text>
    </View>
  );
};

export default Badge;
