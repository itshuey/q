import React, { Component } from "react";
import "../App.css";
import "./Stopwatch.css";

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  componentDidMount() {
    this.handleTimer();
  };

  componentWillUnmount() {
    this.stopTimer();
    this.resetTimer();
  }

  handleTimer = () => {
    if (this.props.beingServed) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = Math.floor(timerTime / 60000) % 60;

    let display = seconds + ':' + centiseconds;
    if (minutes) display = minutes + ':' + display;

    return (
      <div className="Stopwatch">
        <div className="Stopwatch-header">ELLAPSED</div>
        <div className="Stopwatch-display">
          {display}
        </div>
      </div>
    );
  }
}

export default Stopwatch;