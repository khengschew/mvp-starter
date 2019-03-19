import React from 'react';

const Projectile = (props) => (
  <div 
    className="projectile"
    style={
      {
        top: props.top + 'px',
        left: props.left + 'px',
      }
    }
  >
  </div>
);

export default Projectile;
