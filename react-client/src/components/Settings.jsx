import React from 'react';

const Settings = (props) => (
  <div>
    <h3>Max Points</h3>
    <div>15</div>
    <h3>Max Speed</h3>
    <div>{props.maxSpeed}</div>
    <button name="maxSpeed" onClick={props.decreaseStat}>-</button>
    <button name="maxSpeed" onClick={props.increaseStat}>+</button>
    <h3>Turn Speed</h3>
    <div>{props.turnSpeed}</div>
    <button name="turnSpeed" onClick={props.decreaseStat}>-</button>
    <button name="turnSpeed" onClick={props.increaseStat}>+</button>
    <h3>Fire Rate</h3>
    <div>{props.fireRate}</div>
    <button name="fireRate" onClick={props.decreaseStat}>-</button>
    <button name="fireRate" onClick={props.increaseStat}>+</button>
    <button onClick={props.updateStats}>Update Stats</button>
  </div>
);

export default Settings;
