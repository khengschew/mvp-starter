// This code will control the game logic including:
// Calculating how much each ship has moved
// Calculating how much projectiles have moved, and if they should be destroyed
// Determining if ships have collided
// Determining if a ship has been hit
// Determining if a game is over

module.exports = {
  players: [],
  reset: () => {
    this.players = [];
  },
};
