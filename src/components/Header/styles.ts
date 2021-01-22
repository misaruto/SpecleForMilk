import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    minHeight: 60,
    maxHeight: 60,

    alignItems: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 50,
  },
  backAndTextContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    left: 2,
  },
  drawerButtonContainer: {
    position: 'absolute',
    left: 2,
    flexDirection: 'row',
    height: 50,
  },
  drawerButton: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    width: 60,
    height: 52,
    left: 4,
  },

  backButton: {
    textAlign: 'center',
    justifyContent: 'center',
    width: 60,
    height: 52,
    left: 4,
    zIndex: 2,
  },

  title: {
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
