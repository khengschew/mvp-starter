import React from 'react';
import Ship from './Ship';

const Board = () => (
  <div className="board">
    <Ship top={0} left={0} direction={0} player={1} maxHeight={800} maxWidth={800} />
    {/* <Ship top={400} left={400} direction={180} player={2} /> */}
  </div>
);

export default Board;
