// Class for projectile
// Should include methods like momentum, checkHit, checkRange
const Projectile = function(shipTop, shipLeft, shipDirection) {
  this.top = shipTop + 14;
  this.left = shipLeft + 8;
  this.speed = 2;
  this.direction = shipDirection;
  this.interval = 15;
};

Projectile.prototype.momentum = function() {
  var opp = Math.sin((this.direction / 180) * Math.PI) * this.speed;
  var adj = Math.cos((this.direction / 180) * Math.PI) * this.speed;

  this.top += opp;
  this.left += adj;

  this.interval--;
};

module.exports = { Projectile };