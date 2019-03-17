import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Board from './components/Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: io(),
    };
  }

  render () {
    return (<div>
      <Board />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));