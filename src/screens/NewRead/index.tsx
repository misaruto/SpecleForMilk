import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from '../../components/Themed';

import Header from '../../components/Header';
import styles from './styles';
import TcpSocket from 'react-native-tcp-socket';

function NewRead() {
  const [state, setState] = useState({chatter: []});
  const handleAppStateChange = useCallback((nextAppState) => {
    setState((prevState) => ({...prevState, appState: nextAppState}));
  }, []);

  const startServer = useCallback(() => {
    const server = TcpSocket.createServer(function (socket) {
      socket.on('data', (data) => {
        socket.write('Echo server ' + data);
      });

      socket.on('error', (error) => {
        console.log('An error ocurred with client socket ', error);
      });

      socket.on('close', (error) => {
        console.log('Closed connection with ', socket.address());
      });
    }).listen({port: 9312, host: '0.0.0.0', reuseAddress: true}, (address) => {
      console.log('opened server on ', address);
    });

    server.on('error', (error) => {
      console.log('An error ocurred with the server', error);
    });

    server.on('close', () => {
      console.log('Server closed connection');
    });
  }, []);
  useEffect(() => {
    startServer();
  }, [startServer]);
  return (
    <View style={styles.container}>
      {/* {Array.isArray(connectedDevices) && connectedDevices.length ? (
        connectedDevices.map((device: string) => (
          <View key={device} styles={styles.deviceContainer}>
            <Text>Nome do dispositivo: {device}</Text>
          </View>
        ))
      ) : (
        <View>
          <Text style={styles.noDeviceFoundText}>
            Nenhum dispositivo conectado!!!
          </Text>
        </View>
      )} */}
      <TouchableOpacity onPress={startServer}>
        <Text>Testar essa parada</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NewRead;
