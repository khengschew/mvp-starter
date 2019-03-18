import React from 'react';
import _ from 'underscore';

class Ship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
      speed: 1,
      currSpeed: 0,
      maxSpeed: 10, // user setting
      turnSpeed: 10, // user setting
      fireRate: 10, // user setting
      isAlive: true,
      direction: props.direction,
      top: props.top,
      left: props.left,
      ArrowUp: 0,
      ArrowDown: 0,
      ArrowLeft: 0,
      ArrowRight: 0,
      SpaceBar: 0,
      keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'SpaceBar'],
    };

    this.move = _.debounce(this.move, 30, {leading: true}).bind(this);
    this.momentum = this.momentum.bind(this);
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
      var key = e.key === ' ' ? 'SpaceBar' : e.key;
      console.log(`Keydown: ${key}`);
      if (this.state.keys.includes(key)) {
        var newState = {};
        newState[key] = 1;
        this.props.socket.emit('key', { action: 'keydown', key });
        this.setState(newState, () => this.move());
      }
    });

    document.getElementsByTagName('body')[0].addEventListener('keyup', (e) => {
      var key = e.key === ' ' ? 'SpaceBar' : e.key;
      console.log(`Keyup: ${key}`);
      if (this.state.keys.includes(key)) {
        var newState = {};
        newState[key] = 0;
        this.props.socket.emit('key', { action: 'keyup', key });
        this.setState(newState, () => this.move());
      }
    });

    this.momentum();
  }

  momentum() {
    var newState = {};

    newState.top = (this.props.maxHeight + (this.state.top + ((this.state.currSpeed / 3) * Math.cos(-(this.state.direction / 180) * Math.PI)))) % this.props.maxHeight;
    newState.left = (this.props.maxWidth + (this.state.left + ((this.state.currSpeed / 3) * Math.sin(-(this.state.direction / 180) * Math.PI)))) % this.props.maxWidth;

    this.setState(newState);

    this.interval = setTimeout(() => this.momentum(), 30);
  }

  move() {
    var { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, SpaceBar } = this.state;

    var newState = {};

    if (ArrowUp) {
      newState.currSpeed = Math.min(this.state.currSpeed + this.state.speed, this.state.maxSpeed);
    }
    if (ArrowDown) {
      newState.currSpeed = Math.max(this.state.currSpeed - this.state.speed, 0);
    }
    if (ArrowLeft) {
      newState.direction = this.state.direction - this.state.turnSpeed;
    }
    if (ArrowRight) {
      newState.direction = this.state.direction + this.state.turnSpeed;
    }
    if (SpaceBar) {
      console.log('Fire!');
    }

    this.setState(newState);

  }

  render() {
    return (
      <div
        className="ship"
        data-player="1"
        style={
          {
            top: this.state.top + 'px',
            left:this.state.left + 'px',
            transform: `rotate(${this.state.direction}deg)`,
            backgroundImage: `url("ship1.png")`,
          }
        }
      >
      </div>
    );
  }
}

export default Ship;
