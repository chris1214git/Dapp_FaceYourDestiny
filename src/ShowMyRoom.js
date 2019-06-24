import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './ShowMyRoom.css'

// roomId, kingId, challengerId, poolSize
class ShowMyRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div className="showmyroom">
                <h2>This is your room information</h2>
                <h2>You are the {this.props.isKing? "King":"Challenger"} !</h2>
                <p>Room id:{this.props.roomId}</p>
                <p>Current king:<br></br>{this.props.kingId}</p>
                <p>Current challenger:<br></br>{this.props.challengerId}</p>
                <p>Pool Size:{this.props.poolSize}</p>

                <li><Link to="/game">Go to Game</Link></li>
            </div>
        );
    }
}

export default ShowMyRoom;