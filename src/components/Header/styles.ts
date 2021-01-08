import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    flex: 1,
    maxHeight: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoImage: {
    width: 180,
    height: 50,
  },

  textContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default styles;
