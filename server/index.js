var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var game = require('./gameLogic');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

// Game Settings
const settings = {
  maxPlayers: 4,
};

// Server code
var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(__dirname + '/../react-client/dist'));

// Socket logic is simple:
// Player generates key presses
// Server receives key press information
// Server stores key press information until next tick
// Server broadcasts updated data to all players
io.on('connection', client => {
  console.log('client connected');

  client.on('checkPlayers', (callback) => {
    const eligible = game.players.length < settings.maxPlayers ? game.players.length : false;
    callback(eligible);
  });

  client.on('newPlayer', data => {
    game.players.push(data);
  });

  client.on('key', data => {
    console.log(`${data.action}: ${data.key}`);
  });

  client.on('disconnect', () => {
    // Call from server component will unmount?
    // Need to send the player name that disconnected so can remove from server
    console.log('disconnecting client');
  });
});

server.listen(3000, function() {
  console.log('listening on port 3000!');
});
