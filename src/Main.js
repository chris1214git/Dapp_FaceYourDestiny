import React, { Component } from 'react';
import { Row, Col, Card, Icon } from 'antd';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
let roomSize = 3;
let poolPrices = [];
let roomNumbers = [];
let kings = ['Chris','David','Ivy'];
let i
for (i = 0; i < roomSize; i++) {
    poolPrices.push(getRandomInt(10000));
    roomNumbers.push(i);
}


console.log(poolPrices);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let rooms = [];
        let roomNumber;
        let hill;
        for (i = 0; i < roomSize; i++) {
            roomNumber = 'Room: '+roomNumbers[i]
            hill = (
                <div>
                    <Card title={roomNumber} extra={<a href="#">Battle</a>} style={{ width: 300 }}>
                        <p>Current King: {kings[i]}</p>
                    </Card>
                </div>
            )
            rooms.push(hill);
        }
        return (
            <div>
                <h1>This is Main Page</h1>
                <h1>Welcome to Kingslanding</h1>
                {rooms}
            </div>
        );
    }
}

export default Main;