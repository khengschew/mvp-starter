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

    this.setPlayerData = this.setPlayerData.bind.this();
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
          this.setState({ player: playerName, playerId: playerId }, this.setPlayerData);
        } else {
          this.setState({ player: playerName });
        }

      });
    });
  }

  setPlayerData() {
    this.state.player !== '' ? socket.emit('newPlayer', this.state.player) : '';
  }

  render() {
    const { player, socket, ships } = this.state;

    return (<div>
      {player === null ? '' : <Board socket={socket} ships={ships} />}
    </div>)
  }
}

export default App;