import React from 'react';
import {
  Text,
  ThemedLink,
  TouchableOpacityProps as ThemedTouchableOpacityProps,
} from '../Themed';

import styles from './styles';

interface Props {
  label?: string;
}
export type LinkProps = Props & ThemedTouchableOpacityProps;

const Link: React.FC<LinkProps> = ({label, ...rest}) => {
  return (
    <ThemedLink style={styles.link} {...rest}>
      {label && <Text style={styles.linkText}>{label}</Text>}
      {rest.children}
    </ThemedLink>
  );
};

export default Link;
