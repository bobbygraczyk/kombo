import React, { Component } from "react";
import Twitch from "../components/Twitch";
import "../App.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: "tourney slug",
      loading: false
    };
  }

  inputChange(e) {
    this.setState({
      field: e.target.value
    });
  }

  getStreamButtons() {
    let buttons = [];
    let color = "#9c699c";
    let bottomBorder = "2px solid grey";
    let height = "24px";
    if (this.props.sessionData.streamInfo) {
      for (
        let i = 0;
        i < this.props.sessionData.streamInfo.streamQueue.length;
        i++
      ) {
        if (this.props.streamIndex == i) {
          color = "#943e94";
          bottomBorder = "0px";
          height = "26px";
        } else {
          color = "#9c699c";
          bottomBorder = "2px solid black";
          height = "24px";
        }
        buttons.push(
          <button
            key={i}
            style={{
              backgroundColor: color,
              borderBottom: bottomBorder,
              height: height
            }}
            onClick={() => {
              this.props.setStream(i);
            }}
          >
            {this.props.sessionData.streamInfo.streamQueue[i].stream.streamName}
          </button>
        );
      }
      return buttons;
    } else {
      return "No stream information";
    }
  }

  getStreamQueue() {
    let queue = [];
    if (this.props.sessionData.streamInfo) {
      for (
        let i = 1;
        i <
        this.props.sessionData.streamInfo.streamQueue[this.props.streamIndex]
          .sets.length;
        i++
      ) {
        queue.push(
          <li>
            {
              this.props.sessionData.streamInfo.streamQueue[
                this.props.streamIndex
              ].sets[i].slots[0].entrant !== null ? this.props.sessionData.streamInfo.streamQueue[
                this.props.streamIndex
              ].sets[i].slots[0].entrant.name : "No entrant in slot"
            }
            vs
            {
              this.props.sessionData.streamInfo.streamQueue[
                this.props.streamIndex
              ].sets[i].slots[1].entrant !== null ? this.props.sessionData.streamInfo.streamQueue[
                this.props.streamIndex
              ].sets[i].slots[1].entrant.name : "No entrant in slot"
            }
          </li>
        );
      }
      return queue;
    } else {
      return "No stream information";
    }
  }

  render() {
    let tourneyName = "Test Mode";
    let playerOneName = "Test1";
    let playerTwoName = "Test2";
    const ManageOverlays = () => {};
    const ConnectToSmash = () => {
      return (
        <div>
          Connect to Smash.gg
          <br />
          <input
            onChange={x => this.inputChange(x)}
            value={this.state.field}
            type="text"
          />
          <button onClick={() => {
              this.props.smashValidate(this.state.field);
              this.setState({ loading: true });
            }}>
            Connect
          </button>
        </div>
      );
    };
    if (this.props.sessionData) {
        if(this.props.sessionData.streamInfo) {
      if (this.props.isLive && this.props.sessionData.streamInfo) {
        tourneyName = this.props.sessionData.tournamentName;
        playerOneName = 
            this.props.sessionData.streamInfo.streamQueue[
              this.props.streamIndex
            ].sets[0].slots[0].entrant !== null ? this.props.sessionData.streamInfo.streamQueue[
              this.props.streamIndex
            ].sets[0].slots[0].entrant.name : "No entrant in slot";
        playerTwoName = this.props.sessionData.streamInfo.streamQueue[
            this.props.streamIndex
          ].sets[0].slots[1].entrant !== null ? this.props.sessionData.streamInfo.streamQueue[
            this.props.streamIndex
          ].sets[0].slots[1].entrant.name : "No entrant in slot";
      }
      const Header = () => {
        return (
          <div className="dashboard-header">
            <h2>{tourneyName}</h2>
            <div id="buttons">
              {this.props.isLive
                ? this.getStreamButtons()
                : "Go live to see streams"}
            </div>
            <button
              id="liveButton"
              style={{ backgroundColor: this.props.isLive ? "green" : "red" }}
              onClick={() =>
                this.props.isLive
                  ? this.props.setLive(false)
                  : this.props.setLive(true)
              }
            >
              {this.props.isLive ? "Live" : "Test"}
            </button>
          </div>
        );
      };
      const Queue = () => {
        return (
          <div className="dashboard-queue">
            <h4>Current Set:</h4>
            <small>{playerOneName}</small> vs.
            <small>{playerTwoName}</small>
            <h5>Next up:</h5>
            <ul>
              {this.props.isLive
                ? this.getStreamQueue()
                : "Go live to see queue"}
            </ul>
          </div>
        );
      };
      return (
        <div>
          <Header />
          <Queue />
          <Twitch
            sessionData={this.props.sessionData}
            streamIndex={this.props.streamIndex}
            isLive={this.props.isLive}
          />
        </div>
      );
      } else {
          return (<div><ConnectToSmash /><p>{this.state.loading ? "Loading" : ""}</p></div>)
      }
  }
}
}

export default Dashboard;
