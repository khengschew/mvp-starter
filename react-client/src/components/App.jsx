import React from 'react';
import io from 'socket.io-client';
import Board from './Board';
import Settings from './Settings';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      player: null,
      maxSpeed: 3,
      turnSpeed: 9,
      fireRate: 2,
      id: null,
      socket: io(),
      ships: [],
      projectiles: [],
      keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'SpaceBar'],
    };

    this.increaseStat = this.increaseStat.bind(this);
    this.decreaseStat = this.decreaseStat.bind(this);
    this.updateStats = this.updateStats.bind(this);
  }

  componentDidMount() {
    const { socket } = this.state;

    // Connect to socket
    socket.on('connect', () => {
      // When connected, check whether user can join as player
      socket.emit('checkPlayers', data => {
        var playerName = '';
        var id = null;

        // Available player slots
        if (data !== false) {
          id = parseInt(data) + 1;
          playerName = prompt('Please enter your name to play the game', `Player${id}`);
        }

        if (playerName !== '') {
          socket.emit('newPlayer', { name: playerName, id: id }, (playerObj) => {
            // Set state with player data (maxSpeed, turnSpeed, fireRate)
            this.setState({ player: playerObj.name, id: playerObj.id, maxSpeed: playerObj.maxSpeed, turnSpeed: playerObj.turnSpeed, fireRate: playerObj.fireRate, ships: playerObj.ships });
          });

          // Add key press handlers
          document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
            var key = e.key === ' ' ? 'SpaceBar' : e.key;
            if (this.state.keys.includes(key)) {
              socket.emit('key', { action: 'keydown', id: this.state.id, key });
            }
          });
      
          document.getElementsByTagName('body')[0].addEventListener('keyup', (e) => {
            var key = e.key === ' ' ? 'SpaceBar' : e.key;
            if (this.state.keys.includes(key)) {
              socket.emit('key', { action: 'keyup', id: this.state.id, key });
            }
          });
        } else {
          // No player slots available, subscribe as a watcher
          socket.emit('watcher', data => {
            this.setState({ player: playerName, ships: data });
          });
        }
      });

      // Handler for onUpdate emits from server
      socket.on('onUpdate', data => this.setState(data));

      socket.on('winner', data => alert(`The winner is: ${data}`));
    });
  }

  increaseStat(e) {
    const { maxSpeed, turnSpeed, fireRate } = this.state;
    if (maxSpeed + turnSpeed + fireRate < 15 && this.state[e.target.name] < 10) {
      var newState = {};
      newState[e.target.name] = this.state[e.target.name] + 1;
      this.setState(newState);
    }
  }

  decreaseStat(e) {
    if (this.state[e.target.name] > 1) {
      var newState = {};
      newState[e.target.name] = this.state[e.target.name] - 1;
      this.setState(newState);
    }
  }

  updateStats() {
    const { id, player, maxSpeed, turnSpeed, fireRate } = this.state;
    this.state.socket.emit('updateStats', { id: id, name: player, maxSpeed, turnSpeed, fireRate });
  }

  render() {
    const { player, socket, ships, projectiles } = this.state;

    return (
      <div className="game">
        {player === null ? '' : <Board socket={socket} ships={ships} projectiles={projectiles} />}
        {player === null ? '' : <Settings maxSpeed={this.state.maxSpeed} turnSpeed={this.state.turnSpeed} fireRate={this.state.fireRate} increaseStat={this.increaseStat} decreaseStat={this.decreaseStat} updateStats={this.updateStats} />}
      </div>
    );
  }
}

export default App;