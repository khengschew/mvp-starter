// This code will control the game logic including:
// Calculating how much each ship has moved
// Calculating how much projectiles have moved, and if they should be destroyed
// Determining if ships have collided
// Determining if a ship has been hit
// Determining if a game is over

const Game = function(server) {
  this.players = [];
  this.ships = [];
  this.projectiles = [];
  this.io = server;
  this.winner = null;
};

Game.prototype.momentum = function(maxHeight, maxWidth) {
  // Helper function used to calculate the location of a ship or projectile

  for (var ship of this.ships) {
    ship.momentum(maxHeight, maxWidth);
  }

  // Loop through all projectiles and recalc
  this.projectiles = this.projectiles.filter(projectile => projectile.interval > 0);
  for (var projectile of this.projectiles) {
    projectile.momentum();
  }
};

Game.prototype.onKey = function(data) {
  var currShip = this.ships.filter((value) => {
    return value.id === data.id;
  })[0];

  currShip.onKey(data.action, data.key, this.projectiles);
};

Game.prototype.onUpdate = function() {
  // Recalc positions
  this.momentum(775, 775);

  // Check crashes
  this.checkCrash();

  // Check hits
  this.checkHit();

  // Check winner
  // this.checkWinner();
  
  // Send the position of all ships and projectiles
  this.io.emit('onUpdate', { winner: this.winner, ships: this.ships, projectiles: this.projectiles });
  if (this.winner === null) setTimeout(this.onUpdate.bind(this), 30);
};

Game.prototype.checkCrash = function() {
  // Checks whether two ships have crash into each other
  for (var ship1 of this.ships) {
    for (var ship2 of this.ships) {
      if (ship1 !== ship2) {
        var bounds1 = ship1.getBox();
        var bounds2 = ship2.getBox();

        // Check top boundaries
        if ((bounds1.top <= bounds2.top && (bounds1.top + bounds1.height) >= bounds2.top) || (bounds1.top <= (bounds2.top + bounds2.height) && (bounds1.top + bounds1.height) >= (bounds2.top + bounds2.height))) {
          // Check left boundaries
          if ((bounds1.left <= bounds2.left && (bounds1.left + bounds1.width) >= bounds2.left) || (bounds1.left <= (bounds2.left + bounds2.width) && (bounds1.left + bounds1.width) >= (bounds2.left + bounds2.width))) {
            ship1.dead();
            ship2.dead();
          }
        }
      }
    }
  }
};

Game.prototype.checkHit = function() {
  // Checks whether a projectile hits a ship
  for (var ship of this.ships) {
    for (var projectile of this.projectiles) {
      if (ship.id !== projectile.id) {
        var bounds1 = ship.getBox();
        var bounds2 = projectile.getBox();

        // Check top boundaries
        if ((bounds1.top <= bounds2.top && (bounds1.top + bounds1.height) >= bounds2.top) || (bounds1.top <= (bounds2.top + bounds2.height) && (bounds1.top + bounds1.height) >= (bounds2.top + bounds2.height))) {
          // Check left boundaries
          if ((bounds1.left <= bounds2.left && (bounds1.left + bounds1.width) >= bounds2.left) || (bounds1.left <= (bounds2.left + bounds2.width) && (bounds1.left + bounds1.width) >= (bounds2.left + bounds2.width))) {
            ship.dead();
          }
        }
      }
    }
  }
};

Game.prototype.checkRange = function() {
  // Checks whether a projectile is out of range and whether to remove it
};

Game.prototype.checkWinner = function() {
  // Checks whether game is over and there is a winner
  // If winner: 
    // Reset game, disconnect all sockets?
    // Send an alert to all players with winner name (players need to refresh to replay)
  var stillAlive = [];
  for (var ship of this.ships) {
    if (ship.isAlive) stillAlive.push(ship);
  }

  if (stillAlive.length <= 0) {
    this.winner = 'draw';
  }
  if (stillAlive.length === 1) {
    this.winner = this.players.filter(player => id === stillAlive[0].id).name;
  }
};

module.exports = { Game };
