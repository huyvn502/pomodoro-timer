import React, { Component } from 'react';
import DisplayTimerLeft from './DisplayTimerLeft';
import memoize from 'memoize-one';

var timer;

class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBreakTime: false,
            minuteDisplay: '25'
        }
        this.decreaseUnit = this.decreaseUnit.bind(this);
        this.minuteCountDown = this.minuteCountDown.bind(this);
        this.getTimerLength = this.getTimerLength.bind(this);
        this.resetMinuteDisplay = this.resetMinuteDisplay.bind(this);
    }
    decreaseUnit(value) {
        value = value - 1;
        if (value < 10) return `0${value}`; else return `${value}`;
    }
    getTimerLength = memoize((breakLength, sessionLength) => {
        let tempValue = '';
        if (this.state.isBreakTime) {
            tempValue = (breakLength < 10) ? `0${breakLength}` : `${breakLength}`;
        } else {
            tempValue = (sessionLength < 10) ? `0${sessionLength}` : `${sessionLength}`;
        }
        this.setState(() => {
            return {
                minuteDisplay: tempValue
            }
        });
    });
    minuteCountDown() {
        if (this.state.minuteDisplay === '00') {
            this.setState((state, props) => {
                return {
                    minuteDisplay: (props.breakLength < 10) ? `0${props.breakLength}` : `${props.breakLength}`,
                    isBreakTime: !state.isBreakTime
                }
            });
            return;
        }
        this.setState((state) => {
            return {minuteDisplay: this.decreaseUnit(state.minuteDisplay)}
        })
    }
    componentDidMount() {
        this.setState((state, props) => {
            return {
                minuteDisplay: props.sessionLength
            }
        })
    }
    resetMinuteDisplay() {
        this.setState({
            isBreakTime: false,
            minuteDisplay: '25'
        });
        this.props.resetTimerSet();
    }
    render() {
        this.getTimerLength(this.props.breakLength, this.props.sessionLength);
        return (
            <div id="session-box" className="timer-box">
                <h4><i class="fas fa-stopwatch"></i> Countdown Timer</h4>
                <hr />
                <h3 id="timer-label">{!this.state.isBreakTime ? " - SESSION TIME - " : " - BREAK TIME - "}</h3>
                <DisplayTimerLeft minuteCountDown={this.minuteCountDown}
                    isAllowedUpdate={this.props.isAllowedUpdate}
                    minuteDisplay={this.state.minuteDisplay}
                    resetMinuteDisplay={this.resetMinuteDisplay}/>
            </div>
        );
    }
}

export default Session;
