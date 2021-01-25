import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    minHeight: 60,
    maxHeight: 60,
  },
  logoContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
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
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    left: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    height: 50,
    textAlign: 'center',
  },
  drawerButton: {
    flex: 1,
    alignSelf: 'center',
    zIndex: 3,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
