// This code will control the game logic including:
// Calculating how much each ship has moved
// Calculating how much projectiles have moved, and if they should be destroyed
// Determining if ships have collided
// Determining if a ship has been hit
// Determining if a game is over
const { Ship } = require('./Ship');

const Game = function(server) {
  this.players = [];
  this.ships = [];
  this.projectiles = [];
  this.io = server;
  this.status = true;
};

Game.prototype.momentum = function(maxHeight, maxWidth) {
  // Helper function used to calculate the location of a ship or projectile
  // Loop through all ships and recalc
  // Check crashes
  // Loop through all projectiles and recalc
  // Check hits
  // Set increment

  for (var ship of this.ships) {
    ship.momentum(maxHeight, maxWidth);
  }
};

Game.prototype.onUpdate = function() {
  // Send the position of all ships and projectiles
  this.momentum(775, 775);
  this.io.emit('onUpdate', { ships: this.ships, projectiles: this.projectiles });
  if (this.status) setTimeout(this.onUpdate.bind(this), 30);
};

Game.prototype.checkCrash = function() {
  // Checks whether two ships have crash into each other
};

Game.prototype.fire = function() {
  // If outside of cooldown, creates projectile
  // Else do nothing
};

Game.prototype.checkHit = function() {
  // Checks whether a projectile hits a ship
};

Game.prototype.checkRange = function() {
  // Checks whether a projectile is out of range and whether to remove it
};

Game.prototype.checkWinner = function() {
  // Checks whether game is over and there is a winner
  // If winner: 
    // Reset game, disconnect all sockets?
    // Send an alert to all players with winner name (players need to refresh to replay)
};

module.exports = { Game };
