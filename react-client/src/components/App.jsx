import React from 'react';
import io from 'socket.io-client';
import Board from './Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      socket: io(),
    };
  }

  componentDidMount() {
    const { socket } = this.state;

    socket.on('connect', () => {
      socket.emit('checkPlayers', data => {
        console.log(data);
        var playerName = '';
        if (data !== false) {
          playerName = prompt('Please enter your name to play the game', `Player${parseInt(data) + 1}`);
        } 
        this.setState({ player: playerName }, () => this.state.player !== '' ? socket.emit('newPlayer', this.state.player) : '');
      });
    });
  }

  render() {
    const { player, socket } = this.state;

    return (<div>
      {player === null ? '' : <Board socket={socket} />}
    </div>)
  }
}

export default App;