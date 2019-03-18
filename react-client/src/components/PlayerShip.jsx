import React from 'react';
import _ from 'underscore';

const PlayerShip = (props) => (
      <div
        className="ship"
        style={
          {
            top: props.top + 'px',
            left:props.left + 'px',
            transform: `rotate(${props.direction}deg)`,
            backgroundImage: `url("ship${props.id}${props.isAlive ? '' : 'dead'}.png")`,
          }
        }
      >
      </div>
);

export default PlayerShip;
