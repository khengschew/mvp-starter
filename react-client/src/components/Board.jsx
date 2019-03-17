import React from 'react';
import Ship from './Ship';
import Decoy from './Decoy';

const Board = () => (
  <div className="board">
    <Ship top={0} left={0} direction={0} player={1} maxHeight={775} maxWidth={775} />
    <Decoy top={400} left={400} direction={180} player={2} />
  </div>
);

export default Board;
