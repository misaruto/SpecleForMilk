import {useCallback, useEffect, useRef, useState} from 'react';
import {
  AppState,
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

export default function useBleManager() {
  const handlerDiscover = useRef<EmitterSubscription | null>(null);

  const [state, setState] = useState({
    scanning: false,
    peripherals: new Map(),
    appState: null,
  });

  const handleAppStateChange = useCallback((nextAppState) => {
    setState((prevState) => ({...prevState, appState: nextAppState}));
  }, []);

  const handleDiscoverPeripheral = useCallback((event) => {
    console.log('teste', {event});
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (!handlerDiscover.current) {
      handlerDiscover.current = bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      return () => {
        handlerDiscover.current?.remove();
      };
    }
  }, [handleDiscoverPeripheral]);

  useEffect(() => {
    BleManager.start({showAlert: false});
  }, []);

  return state;
}
