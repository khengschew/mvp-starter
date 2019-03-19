var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var { Game } = require('./gameLogic');
var db = require('../database-mongo');
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
    var dbResults = {};
    db.findOne(newPlayer.name, (err, player) => {
      dbResults = player[0];

      if (Object.keys(dbResults).length > 1) {
        game.ships.push(new Ship(data.id, dbResults.maxSpeed, dbResults.turnSpeed, dbResults.fireRate));

        newPlayer.maxSpeed = dbResults.maxSpeed;
        newPlayer.turnSpeed = dbResults.turnSpeed;
        newPlayer.fireRate = dbResults.fireRate;

      } else {
        game.ships.push(new Ship(data.id, 3, 10, 2));
      }
  
      newPlayer['ships'] = game.ships;
  
      client.broadcast.emit('onUpdate', { ships: game.ships });
      callback(newPlayer);
    });

  });

  client.on('updateStats', (data) => {
    if (data.id !== null) {
      var currShip = game.ships.filter(ship => ship.id === data.id)[0];

      // Save to database
      db.findAndUpdate(data.name, { name: data.name, maxSpeed: data.maxSpeed, turnSpeed: data.turnSpeed, fireRate: data.fireRate }, (err, data) => {
        currShip.updateStats(data.maxSpeed, data.turnSpeed, data.fireRate);
      });
    }
  });

  client.on('watcher', (callback) => {
    callback(game.ships);
  });

  client.on('key', data => {
    game.onKey(data);
  });

  client.on('reset', () => {
    game.ships = [];
    game.projectiles = [];
    for (var player of game.players) {
      game.ships.push(new Ship(player.id, 3, 10, 2));
    }
  });

  client.on('disconnect', () => {
    console.log('disconnecting client');
  });

  game.onUpdate();
});

server.listen(3000, function() {
  console.log('listening on port 3000!');
});
