import {StyleSheet} from 'react-native';

const cards = StyleSheet.create({
  ultimaLeituraContainer: {
    width: '100%',
  },
  ultimaLeituraTitle: {},
  ultimaLeituraData: {},
  leituraContainer: {
    height: 400,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 4,
  },
});
const lines = StyleSheet.create({
  ultimaLeituraContainer: {},
  ultimaLeituraTitle: {},
  ultimaLeituraData: {},
  leituraContainer: {},
});

const styles = {linesLayout: lines, cardsLayout: cards};

export default styles;
