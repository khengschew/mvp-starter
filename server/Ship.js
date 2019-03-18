// Class for ship
// Should include methods like move, momentum, getPos, checkCrash, fire
// Should include properties like top, left, direction, isAlive

const Ship = function(id, maxSpeed, turnSpeed, fireRate) {
  var zeroed = id - 1;

  this.id = id;
  this.speed = 1;
  this.currSpeed = 0;
  this.maxSpeed = maxSpeed;
  this.turnSpeed = turnSpeed;
  this.fireRate = fireRate;
  this.top = Math.floor(zeroed / 2) < 1 ? 0 : 770;
  this.left = zeroed % 2 === 1 ? 770 : 0;
  this.direction = Math.floor(zeroed / 2) < 1 ? 0 : 180;
  this.isAlive = true;
  this.ArrowUp = 0;
  this.ArrowDown = 0;
  this.ArrowLeft = 0;
  this.ArrowRight = 0;
  this.SpaceBar = 0;
  this.keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'SpaceBar'];
};

Ship.prototype.onKey = function(action, key) {
  if (action === 'keydown') {
    // console.log(`${action}: ${key} for ship ${this.id}`);
    this[key] = 1;
  } else if (action === 'keyup') {
    // console.log(`${action}: ${key} for ship ${this.id}`);
    this[key] = 0;
  }

  this.move();
};

Ship.prototype.move = function() {
  var { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, SpaceBar } = this;

  if (ArrowUp) {
    this.currSpeed = Math.min(this.currSpeed + this.speed, this.maxSpeed);
  }
  if (ArrowDown) {
    this.currSpeed = Math.max(this.currSpeed - this.speed, 0);
  }
  if (ArrowLeft) {
    this.direction = this.direction - this.turnSpeed;
  }
  if (ArrowRight) {
    this.direction = this.direction + this.turnSpeed;
  }
  if (SpaceBar) {
    console.log('Fire!');
  }
};

Ship.prototype.momentum = function(maxHeight, maxWidth) {
  this.top = (maxHeight + (this.top + ((this.currSpeed / 3) * Math.cos(-(this.direction / 180) * Math.PI)))) % maxHeight;
  this.left = (maxWidth + (this.left + ((this.currSpeed / 3) * Math.sin(-(this.direction / 180) * Math.PI)))) % maxWidth;
};

Ship.prototype.fire = function() {

};

module.exports = { Ship };
