const fs = require('fs');
const https = require('https');

const express = require('express');
const app = express();

var options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt')
}

let serverPort = 5000;

const server = https.createServer(options,app);
const io = require('socket.io')(server);

app.use('/', express.static(`${process.cwd()}/../client`));

io.on('connection', function(socket) {
    console.log('new connection');
    socket.emit('message', 'This is a message from the dark side.');
  });

server.listen(serverPort, function() {
    console.log('server up and running at %s port', serverPort);
  });

