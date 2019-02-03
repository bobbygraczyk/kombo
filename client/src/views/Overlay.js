import React, { Component } from "react";
import "../App.css";

class Overlay extends Component {
    render() {
        if(this.props.sessionData.streamInfo){
        return(
            <div className="scoreboard">
                <p id="player-one-name">
                {this.props.sessionData.streamInfo.streamQueue[this.props.streamIndex].sets[0]
            .slots[0].entrant.name}
                </p>
                <p id="round">
                Round Name
                </p>
                <p id="player-two-name">
                {this.props.sessionData.streamInfo.streamQueue[this.props.streamIndex].sets[0]
            .slots[1].entrant.name}
                </p>
            </div>
        )
        } else {
            return (<div className="scoreboard">
            <p id="player-one-name">
            Player One
            </p>
            <p id="round">
            Round Name
            </p>
            <p id="player-two-name">
            Player Two
            </p>
        </div>)
        }
    }
}

export default Overlay;