import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verEvolucaoContainer: {
    height: 90,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  verEvolucaoTexto: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    width: '80%',
    padding: 6,
  },
});

export default styles;
