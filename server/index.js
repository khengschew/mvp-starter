var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var game = require('./gameLogic');
var players = require('../database-mongo');

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

  client.on('newPlayer', (data, callback) => {
    var newPlayer = {
      name: data.name,
      id: data.id,
    };

    game.players.push(newPlayer);

    // Check database to see if player exists
    // If player exists, retrieve data from database and return
    // If not, return object with base defaults
    var zeroed = data.id - 1;

    game.ships.push({
      top: Math.floor(zeroed / 2) < 1 ? 0 : 770,
      left: zeroed % 2 === 1 ? 775 : 0,
      direction: Math.floor(zeroed / 2) < 1 ? 0 : 180,
      id: data.id
    });
    newPlayer['ships'] = game.ships;

    callback(newPlayer);
    client.broadcast.emit('onUpdate', { ships: game.ships });
  });

  client.on('watcher', (callback) => {
    callback(game.ships);
  });

  client.on('key', data => {
    console.log(`${data.action}: ${data.key}`);
  });

  client.on('disconnect', () => {
    console.log('disconnecting client');
  });

  game.onUpdate();
});

server.listen(3000, function() {
  console.log('listening on port 3000!');
});
