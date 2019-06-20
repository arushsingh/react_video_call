const io = require('socket.io');
const users = require('./users');
const fs = require('fs');

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
function initSocket(socket) {
  let id;
  socket
    .on('init', async () => {
      id = await users.create(socket);
      socket.emit('init', { id });
      
    })
    .on('request', (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit('request', { from: id });
      }
    })
    .on('call', (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit('call', { ...data, from: id });
      } else {
        socket.emit('failed');
      }
    })
    .on('end', (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit('end');
      }
    })
    .on('disconnect', () => {
      users.remove(id);
      console.log(id, 'disconnected');
    });
}

// let options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert'),
//   requestCert: false,
//   rejectUnauthorized: false,
// };

module.exports = (server) => {
  io
    .listen(server,{ log: true }) .on('connection', initSocket);
};
