import React from 'react';
import PlayerShip from './PlayerShip';
import Projectile from './Projectile';

const Board = (props) => (
  <div className="board">
    {props.ships.map(ship => (
      <PlayerShip top={ship.top} left={ship.left} direction={ship.direction} isAlive={ship.isAlive} id={ship.id} maxHeight={775} maxWidth={775} socket={props.socket} key={ship.id} />
    ))}
    {props.projectiles.map(projectile => (
      <Projectile top={projectile.top} left={projectile.left} />
    ))}
  </div>
);

export default Board;
