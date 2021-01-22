import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 150,
    minWidth: '42%',
    width: '42%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: 'gray',
    margin: 4,
    padding: 2,
  },
  leituraNomeContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'column',
    bottom: 10,
    justifyContent: 'flex-end',
    height: '30%',
  },
  leituraNome: {
    height: 30,
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  leituraValorContainer: {
    width: '100%',
    height: '70%',
  },
  valor: {
    textAlign: 'center',
    fontSize: 40,
  },
  unidade: {
    textAlign: 'right',
    right: 4,
    fontSize: 20,
    color: '#aaa',
  },
});

export default styles;
