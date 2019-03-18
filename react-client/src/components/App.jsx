import React from 'react';
import io from 'socket.io-client';
import Board from './Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      id: null,
      socket: io(),
      ships: [],
      projectiles: [],
      ArrowUp: 0,
      ArrowDown: 0,
      ArrowLeft: 0,
      ArrowRight: 0,
      SpaceBar: 0,
      keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'SpaceBar'],
    };
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
            this.setState({ player: playerObj.name, id: playerObj.id, ships: playerObj.ships });
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
      // socket.on('onUpdate', data => console.log(data));
      socket.on('onUpdate', data => this.setState(data));
    });
  }

  render() {
    const { player, socket, ships } = this.state;

    return (<div>
      {player === null ? '' : <Board socket={socket} ships={ships} />}
    </div>)
  }
}

export default App;