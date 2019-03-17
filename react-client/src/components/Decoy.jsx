import React from 'react';
import _ from 'underscore';

class Decoy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: props.player,
      speed: 10,
      currSpeed: 0,
      maxSpeed: 30,
      turnSpeed: 10,
      fireRate: 10,
      direction: props.direction,
      top: props.top,
      left: props.left,
      ArrowUp: 0,
      ArrowDown: 0,
      ArrowLeft: 0,
      ArrowRight: 0,
      keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
    };
  }

  render() {
    return (
      <div
        className="decoy"
        data-player="1"
        style={
          {
            top: this.state.top + 'px',
            left:this.state.left + 'px',
            transform: `rotate(${this.state.direction}deg)`,
          }
        }
      >
      </div>
    );
  }
}

export default Decoy;
