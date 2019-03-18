import React from 'react';
// import Ship from './Ship';
import PlayerShip from './PlayerShip';

const Board = (props) => (
  <div className="board">
    {props.ships.map(ship => (
      <PlayerShip top={ship.top} left={ship.left} direction={ship.direction} isAlive={ship.isAlive} id={ship.id} maxHeight={775} maxWidth={775} socket={props.socket} key={ship.id} />
    ))}
  </div>
);

export default Board;
