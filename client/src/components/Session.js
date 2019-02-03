import React, { Component } from 'react';
import Card from './UILibrary.js';
import { Link } from "react-router-dom";
import axios from 'axios';

class CreateSession extends Component {
    render(){
        return(
            <React.Fragment>
            <Card text={"Join Session"} />
            <Link to="/create"><Card text={"New Session"} /></Link>
            </React.Fragment>
            
        )
    }
}

class NewSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: "Session Name"
        }
    }
    createNewSession(id) {      
        if(id && id.length > 3 && id !== "Session Name") {
            const key = {"key": id};
            axios.post('/api/sessions', key)
                .then(res => {
                    if (res.data){
                        this.props.setSession(key);
                    }
                })
                .catch(err => console.log(err))

        } else {
            console.log("Does not meet input requirements");
        }
    }
    inputChange(e) {
        this.setState({
            field: e.target.value
          })
    }
    render(){
        return(
            <React.Fragment>
                <h2>Create Session</h2>
                <input onChange={(x) => this.inputChange(x)} value={this.state.field} type="text" />
                <button onClick={() => this.createNewSession(this.state.field)}>Create</button>
            </React.Fragment>
        )
    }
}

export {CreateSession, NewSession};