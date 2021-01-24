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
    textAlign: 'center',
    justifyContent: 'center',
    width: 60,
    height: 52,
    left: 4,
    zIndex: 2,
  },
  backButtonContainer: {
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    margin: 0,
    left: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },

  backButton: {
    flex: 1,
    zIndex: 3,
    justifyContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
