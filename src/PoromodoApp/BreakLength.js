import React, { Component } from 'react';

class BreakLength extends Component {
    render() {
        return (
            <div className="timer-box">
                <h4 id="break-label"><i class="fas fa-history"></i> Break Length</h4>
                <hr />
                <div className="timer-controller">
                    <button id="break-decrement" onClick={this.props.decrease}><i className="fas fa-minus"></i></button>
                    <div className="display-time">
                        <h1 id="break-length">{this.props.breakLength}</h1>
                        <p>minutes</p>
                    </div>
                    <button id="break-increment" onClick={this.props.increase}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        );
    }
}

export default BreakLength;
