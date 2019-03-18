import React from 'react';
import io from 'socket.io-client';
import Board from './Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      playerId: null,
      socket: io(),
      ships: [],
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    const { socket } = this.state;

    socket.on('connect', () => {
      socket.emit('checkPlayers', data => {
        var playerName = '';
        var playerId = null;

        if (data !== false) {
          playerId = parseInt(data) + 1;
          playerName = prompt('Please enter your name to play the game', `Player${playerId}`);
        }

        if (playerName !== '') {
          // Retrieve player data from server
          // Set state with player data
          socket.emit('newPlayer', { name: playerName, id: playerId }, (playerObj) => {
            // Set state using data
            this.setState({ player: playerObj.name, playerId: playerObj.id, ships: playerObj.ships });
          });
        } else {
          socket.emit('watcher', data => {
            this.setState({ player: playerName, ships: data });
          });
        }
      });

      socket.on('onUpdate', this.onUpdate);
    });
  }

  onUpdate(data) {
    this.setState(data);
  }

  render() {
    const { player, socket, ships } = this.state;

    return (<div>
      {player === null ? '' : <Board socket={socket} ships={ships} />}
    </div>)
  }
}

export default App;