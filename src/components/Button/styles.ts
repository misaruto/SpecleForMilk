import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    minWidth: '50%',
    minHeight: 20,
  },
  defaultButton: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    width: '80%',
    borderWidth: 1,
    borderRadius: 20,
  },
  defaultLabel: {
    marginRight: 4,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
