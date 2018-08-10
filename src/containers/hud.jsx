import React, { Component } from 'react';
import Robot from '../components/robot';
import Score from '../components/score';

class Hud extends Component {
  render() {
    return (
        <div>
            <Robot />
            <Score />
        </div>
    );
  }
}

export default Hud;