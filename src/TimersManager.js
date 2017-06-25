import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Timer from './Timer.js';
import './TimersManager.css'

export default class TimersManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: []
    }
  }

  addTimer() {
    const newTimer = (
      <Timer />
    );

    this.setState({
      timers: this.state.timers.concat(newTimer)
    });
  }

  render() {
    let idx = 0;
    const timersList = this.state.timers.map((timer) => {
      return <li key={'timer_' + idx++}>{timer}</li>
    });

    return (
      <div>
        <div>
          <ul className="timers-list">
            {timersList}
          </ul>
        </div>
        <div>
          <FontAwesome name="plus" onClick={this.addTimer.bind(this)} />
        </div>
      </div>
    );
  }
}
