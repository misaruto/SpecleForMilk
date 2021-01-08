import TcpSocket from 'react-native-tcp-socket';

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
}).listen({port: 8080, host: '192.168.0.17'});

server.on('error', (error) => {
  console.log('An error ocurred with the server', error);
});

server.on('close', () => {
  console.log('Server closed connection');
});

export default server;
