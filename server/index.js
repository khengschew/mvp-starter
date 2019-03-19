var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var { Game } = require('./gameLogic');
var players = require('../database-mongo');
var { Ship } = require('./Ship');

// Game Settings
const settings = {
  maxPlayers: 4,
};

// Server code
var app = express();
var server = http.createServer(app);
var io = socketio(server);

app.use(express.static(__dirname + '/../react-client/dist'));

// Initialize game
var game = new Game(io);

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
    // var zeroed = data.id - 1;

    game.ships.push(new Ship(data.id, 5, 10, 5));

    newPlayer['ships'] = game.ships;

    client.broadcast.emit('onUpdate', { ships: game.ships });
    callback(newPlayer);
  });

  client.on('watcher', (callback) => {
    callback(game.ships);
  });

  client.on('key', data => {
    game.onKey(data);
  });

  client.on('disconnect', () => {
    console.log('disconnecting client');
  });

  game.onUpdate();
});

server.listen(3000, function() {
  console.log('listening on port 3000!');
});
