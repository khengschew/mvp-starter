var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(__dirname + '/../react-client/dist'));

io.on('connection', client => {
  console.log('client connected');
  client.on('event', data => {
    console.log(data);
  });

  client.on('disconnect', () => {
    console.log('disconnecting client');
  });
});

server.listen(3000, function() {
  console.log('listening on port 3000!');
});
