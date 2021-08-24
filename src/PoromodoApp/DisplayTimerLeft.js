import React, { Component } from 'react';
import $ from 'jquery';

const urlBeep = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';
var timer;

class DisplayTimerLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySeconds: '00',
            isPause: true
        };
        this.decreaseUnit = this.decreaseUnit.bind(this);
        this.startOrPauseTimer = this.startOrPauseTimer.bind(this);
        this.secondsCountDown = this.secondsCountDown.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
    }
    decreaseUnit(value) {
        value = value - 1;
        if (value < 10) return `0${value}`; else return `${value}`;
    }
    secondsCountDown() {
        if (this.state.displaySeconds === '00') {
            if (this.props.minuteDisplay === '00') {
                this.props.minuteCountDown();
                this.setState({displaySeconds: '00'});
                return; 
            }
            this.props.minuteCountDown();
            this.setState({displaySeconds: '59'});
            return;
        }
        this.setState((state) => {
            return {
                displaySeconds: this.decreaseUnit(state.displaySeconds)
            };
        })
        if (this.state.displaySeconds === '00' & this.props.minuteDisplay === '00') this.playAudio();
    }
    startOrPauseTimer() {
        if (this.state.isPause) {
            $(".fa-play").hide();
            $(".fa-pause").show();
        } else {
            $(".fa-play").show();
            $(".fa-pause").hide();
        }

        if (this.state.isPause) {
            timer = setInterval(this.secondsCountDown, 1000);
        } 
        else {
            clearInterval(timer);
        }
        this.setState((state) => {
            return {isPause: !state.isPause}
        })
        this.props.isAllowedUpdate(); //Prevent Update Break & Session Length when Timer is Counting
    }
    playAudio() {
        document.getElementById("beep").play();
    }
    pauseAudio() {
        document.getElementById("beep").load();
    }
    resetAll() {
        this.pauseAudio();
        clearInterval(timer);
        this.props.resetMinuteDisplay();
        if (!this.state.isPause) this.props.isAllowedUpdate();
        this.setState({
            displaySeconds: '00',
            isPause: true
        });
        $(".fa-play").show();
        $(".fa-pause").hide();
    }
    componentDidMount() {
        $(".fa-pause").hide();
    }
    componentDidUpdate() {
        if (this.props.minuteDisplay === '00') {
            $("#time-left").css("color", "red");
        } else $("#time-left").css("color", "#F6F6F6");
    }
    render() {
        return (
            <div>
                <h1 id="time-left">
                    {this.props.minuteDisplay}:{this.state.displaySeconds}
                </h1>
                <div className="time-left-controller">
                    <button id="start_stop" onClick={this.startOrPauseTimer}>
                        <i className="fas fa-pause"></i>
                        <i className="fas fa-play"></i>
                    </button>
                    <button id="reset" onClick={this.resetAll}><i className="fas fa-sync-alt"></i></button>
                </div>
                <audio id="beep">
                    <source src={urlBeep} type="audio/wav" />
                </audio>
            </div>
        );
    }
}

export default DisplayTimerLeft;
