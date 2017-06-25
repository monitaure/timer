import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import './Timer.css';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this._interval = null;
    this._offset = null;

    this.state = {
      elapsedTime: 0,
      on: false,
      label: ''
    };
  }

  play() {
    if (!this._interval) {
      this.setState({
        on: true
      });
      this._offset = Date.now();
      this._interval = setInterval(this.update.bind(this), 5);
    }
  }

  pause() {
    this.setState({
      on: false
    });
    clearInterval(this._interval);
    this._interval = null;
  }

  reset() {
    this.pause();
    this.setState({elapsedTime: 0});
  }

  update() {
    this.setState({
      elapsedTime: this.state.elapsedTime + this.calculateElapsedTime()
    });
  }

  handleLabelInput(e) {
    this.setState({
      label: e.target.value
    });
  }

  calculateElapsedTime() {
    let now = Date.now();
    let elapsedTime = now - this._offset;
    this._offset = now;
    return elapsedTime;
  }

  displayTimer() {
    let duration = moment.duration(this.state.elapsedTime, 'ms');
    return moment(duration.asMilliseconds()).format('mm:ss.SSS');
  }

  render() {
    let playStop;
    if (!this.state.on) {
      playStop = (
        <FontAwesome className="control" name="play" onClick={this.play.bind(this)} />
      );
    } else {
      playStop = (
        <FontAwesome className="control" name="pause" onClick={this.pause.bind(this)} />
      );
    }

    return (
      <div className="timer">
        <div className="label">
          <input type="text" onChange={this.handleLabelInput.bind(this)} value={this.state.label} />
        </div>
        <div className="clock">
          {this.displayTimer()}
        </div>
        <div className="controls">
          {playStop}
          <FontAwesome className="control" name="refresh" onClick={this.reset.bind(this)} />
        </div>
      </div>
    );
  }
}
