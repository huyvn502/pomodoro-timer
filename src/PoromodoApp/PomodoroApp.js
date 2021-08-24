import React, { Component } from 'react';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import Session from './Session';
import $ from 'jquery';

class PomodoroApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            allowUpdate: true
        }
        this.isAllowedUpdate = this.isAllowedUpdate.bind(this);
        this.increaseBreakLength = this.increaseBreakLength.bind(this);
        this.decreaseBreakLength = this.decreaseBreakLength.bind(this);
        this.increaseSessionLength = this.increaseSessionLength.bind(this);
        this.decreaseSessionLength = this.decreaseSessionLength.bind(this);
        this.resetTimerSet = this.resetTimerSet.bind(this);
    }
    //Prevent Update Break & Session Length when Timer is Counting
    isAllowedUpdate() {
        this.setState((state) => {
            return {allowUpdate: !state.allowUpdate}
        });
    }

    // Set Break Length Timer 
    increaseBreakLength() {
        if (!this.state.allowUpdate) return;
        this.setState((state) => {
            if(this.state.breakLength < 60) return {breakLength: state.breakLength + 1};
        });
    }
    decreaseBreakLength() {
        if (!this.state.allowUpdate) return;
        this.setState((state) => {
            if (this.state.breakLength > 1) return {breakLength: state.breakLength - 1};
        });
    }
    
    // Set Session Length Timer 
    increaseSessionLength() {
        if (!this.state.allowUpdate) return;
        this.setState((state) => {
            if (this.state.sessionLength < 60) return {sessionLength: state.sessionLength + 1};
        })
    }
    decreaseSessionLength() {
        if (!this.state.allowUpdate) return;
        this.setState((state) => {
            if (this.state.sessionLength > 1) return {sessionLength: state.sessionLength - 1};
        })
    }

    //Reset default value
    resetTimerSet() {
        this.setState({
            breakLength: 5,
            sessionLength: 25,
        });
    }
    componentDidUpdate() {
        if (this.state.breakLength === 1 || this.state.breakLength === 60) {
            $("#break-length").css("color", "rgb(155, 5, 5)");
        } else {
            $("#break-length").css("color", "#F6F6F6");
        }
        if (this.state.sessionLength === 1 || this.state.sessionLength === 60) {
            $("#session-length").css("color", "rgb(155, 5, 5)");
        } else {
            $("#session-length").css("color", "#F6F6F6");
        }
    }
    render() {
        return (
            <div id="pomodoro-container">
                <h1 id="title-header">Pomodoro Timer</h1>
                <BreakLength increase={this.increaseBreakLength} 
                    decrease={this.decreaseBreakLength}
                    breakLength={this.state.breakLength}>
                </BreakLength>
                <SessionLength increase={this.increaseSessionLength} 
                    decrease={this.decreaseSessionLength} 
                    sessionLength={this.state.sessionLength}>
                </SessionLength>
                <Session breakLength={this.state.breakLength}
                    sessionLength={this.state.sessionLength}
                    isAllowedUpdate={this.isAllowedUpdate} 
                    resetTimerSet={this.resetTimerSet}>
                </Session>
            </div>
        );
    }
}

export default PomodoroApp;
