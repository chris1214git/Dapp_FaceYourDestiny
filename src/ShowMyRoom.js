import React, { Component } from 'react';
import { Link } from "react-router-dom"


// roomId, kingId, challengerId, poolSize
class ShowMyRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div>
                <h1>You are in a room now</h1>
                <h2>This is your room information</h2>
                <h2>You are the {this.props.isKing? "King":"Challenger"} now</h2>
                <p>Room id:{this.props.roomId}</p>
                <p>Current king:{this.props.kingId}</p>
                <p>Current challenger:{this.props.challangerId}</p>
                <p>Pool Size:{this.props.poolSize}</p>

                <li><Link to="/game">Go to Game</Link></li>
            </div>
        );
    }
}

export default ShowMyRoom;