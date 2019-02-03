import React, { Component } from "react";
import "../App.css";
import { CreateSession } from "../components/Session";
import Dashboard from "../views/Dashboard";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: "capitals-esports-faceoff"
    };
  }
  inputChange(e) {
    this.setState({
      field: e.target.value
    });
  }
  render() {
    if (this.props.sessionKey) {
      if (this.props.tournamentInfo) {
        return (
            <div>
            <span>
          <h1>Laddr</h1>
        </span>
          <Dashboard
            streamInfo={this.props.streamInfo}
            tournamentInfo={this.props.tournamentInfo}
            setStream={x => this.props.setStream(x)}
            streamIndex={this.props.streamIndex}
          />
          </div>
        );
      } else {
        return (
            <div>
            <span>
          <h1>Laddr</h1>
        </span>
          <div>
            Connect to Smash.gg
            <br />
            <input
              onChange={x => this.inputChange(x)}
              value={this.state.field}
              type="text"
            />
            <button onClick={() => this.props.smashValidate(this.state.field)}>
              Connect
            </button>
          </div>
          </div>
        );
      }
    } else {
      return (<div><span>
      <h1>Laddr</h1>
      </span><CreateSession /></div>);
    }
  }
}

export default Welcome;
