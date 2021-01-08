import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  header: {
    position: 'relative',
    margin: 0,
  },
  userItem: {
    margin: 0,
  },
  ultimaLeituraContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 14,
  },
  ultimaLeituraTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
  ultimaLeituraData: {
    fontSize: 26,
    color: '#444',
  },
});

export default styles;
