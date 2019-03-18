// This code will control the game logic including:
// Calculating how much each ship has moved
// Calculating how much projectiles have moved, and if they should be destroyed
// Determining if ships have collided
// Determining if a ship has been hit
// Determining if a game is over

module.exports = {
  players: [],
  ships: [], // Can maybe nest this within player? Or vice versa?
  projectiles: [],
  reset: () => {
    this.players = [];
    this.ships = [];
    this.projectiles = [];
  },
  momentum: () => {
    // Helper function used to calculate the location of a ship or projectile
  },
  move: () => {
    // Triggered on key press, alters the currSpeed, direction of a ship
  },
  onUpdate: () => {
    // Send the position of all ships and projectiles
    // SetTimeout to recall this function every 30 ms
  },
  checkCrash: () => {
    // Checks whether two ships have crash into each other
  },
  fire: () => {
    // If outside of cooldown, creates projectile
    // Else do nothing
  },
  checkHit: () => {
    // Checks whether a projectile hits a ship
  },
  checkRange: () => {
    // Checks whether a projectile is out of range and whether to remove it
  },
  checkWinner: () => {
    // Checks whether game is over and there is a winner
    // If winner: 
      // Reset game, disconnect all sockets?
      // Send an alert to all players with winner name (players need to refresh to replay)
  }
};
