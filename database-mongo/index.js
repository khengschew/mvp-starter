var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seas');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var playerSchema = mongoose.Schema({
  name: String,
  maxSpeed: Number,
  turnSpeed: Number,
  fireRate: Number,
});

var Player = mongoose.model('Player', playerSchema);

var selectAll = function(callback) {
  Player.find({}, function(err, players) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, players);
    }
  });
};

var findOne = function(name, callback) {
  Player.find({ name: name }, function(err, player) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, player);
    }
  });
};

module.exports = { selectAll, findOne };