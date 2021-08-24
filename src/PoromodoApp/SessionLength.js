import React, { Component } from 'react';

class SessionLength extends Component {
    render() {
        return (
            <div className="timer-box">
                <h4 id="session-label"><i class="fas fa-clock"></i> Session Length</h4>
                <hr />
                <div className="timer-controller">
                    <button id="session-decrement" onClick={this.props.decrease}><i className="fas fa-minus"></i></button>
                    <div className="display-time">
                        <h1 id="session-length">{this.props.sessionLength}</h1>
                        <p>minutes</p>    
                    </div>    
                    <button id="session-increment" onClick={this.props.increase}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        );
    }
}

export default SessionLength;
