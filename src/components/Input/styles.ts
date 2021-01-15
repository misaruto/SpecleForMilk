import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    maxHeight: 100,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 4,
  },
  input: {
    alignSelf: 'center',
    width: '86%',
    fontSize: 22,
    paddingHorizontal: 2,
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 22,
  },
  inputError: {
    alignSelf: 'center',
    width: '86%',
    fontSize: 12,
    paddingHorizontal: 2,
  },
});

export default styles;
