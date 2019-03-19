const { Projectile } = require('./Projectile');

// Class for ship
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
  this.canFire = true;
  this.isAlive = true;
  this.ArrowUp = 0;
  this.ArrowDown = 0;
  this.ArrowLeft = 0;
  this.ArrowRight = 0;
  this.SpaceBar = 0;
  this.height = 28;
  this.width = 16;
};

Ship.prototype.getBox = function() {
  // Returns array representing [top, left, width, height]
  var newTop = this.top;
  var newLeft = this.left;
  var newWidth = this.width;
  var newHeight = this.height;

  return { top: newTop, left: newLeft, width: newWidth, height: newHeight };
};

Ship.prototype.updateStats = function(maxSpeed, turnSpeed, fireRate) {
  this.maxSpeed = maxSpeed;
  this.turnSpeed = turnSpeed;
  this.fireRate = fireRate;
};

Ship.prototype.onKey = function(action, key, projectiles) {
  if (action === 'keydown') {
    this[key] = 1;
  } else if (action === 'keyup') {
    this[key] = 0;
  }

  if (this.isAlive) {
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
      var fired = this.fire();
      if (fired) projectiles.push(fired);
    }
  }
};

Ship.prototype.momentum = function(maxHeight, maxWidth) {
  if (this.isAlive) {
    this.top = (maxHeight + (this.top + ((this.currSpeed / 3) * Math.cos(-(this.direction / 180) * Math.PI)))) % maxHeight;
    this.left = (maxWidth + (this.left + ((this.currSpeed / 3) * Math.sin(-(this.direction / 180) * Math.PI)))) % maxWidth;
  }
};

Ship.prototype.fire = function() {
  if (this.canFire) {
    console.log('Fire!');
    
    this.canFire = false;
    setTimeout(this.reload.bind(this), 10000 / this.fireRate);
    return new Projectile(this.id, this.top, this.left, this.direction);
  }
};

Ship.prototype.reload = function() {
  console.log('Reloaded!');
  this.canFire = true;
};

Ship.prototype.dead = function() {
  this.isAlive = false;
};

module.exports = { Ship };
