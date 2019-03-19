// Class for projectile
// Should include methods like momentum, checkHit, checkRange
const Projectile = function(id, shipTop, shipLeft, shipDirection) {
  this.id = id;
  this.top = shipTop + 14;
  this.left = shipLeft + 8;
  this.speed = 10;
  this.direction = shipDirection;
  this.interval = 10;
};

Projectile.prototype.getBox = function() {
  return { top: this.top, left: this.left, width: 10, height: 10 };
}

Projectile.prototype.momentum = function() {
  var opp = Math.sin((this.direction / 180) * Math.PI) * this.speed;
  var adj = Math.cos((this.direction / 180) * Math.PI) * this.speed;

  this.top += opp;
  this.left += adj;

  this.interval--;
};

module.exports = { Projectile };