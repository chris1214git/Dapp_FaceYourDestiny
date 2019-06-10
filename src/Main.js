import React, { Component } from 'react';
// import { Row, Col, Card} from 'antd';
import { Card } from 'antd';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let roomSize = 3;
let poolPrices = [];
let roomNumbers = [];
let kings = ['Chris', 'David', 'Ivy'];
let i
for (i = 0; i < roomSize; i++) {
    poolPrices.push(getRandomInt(10000));
    roomNumbers.push(i);
}




// props: pools[n],totalPools
// pool={
//     kingNickName,
//     poolSize,
//     currentPoolSize,
//
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectpoolsize: 0,
            pools: this.props.pools,
            totalPools: this.props.totalPools
        };
        console.log(this.state.totalPools)

        this.changeStatePoolsize = this.changeStatePoolsize.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    renderPool(roomName, kingId, poolSize, Fee) {
        return (
            <div>
                <Card title={roomName} extra={<a href="#">Battle</a>} style={{ width: 300 }}>
                    {/* <p>Current King: {kings[i]}</p> */}
                    <p>Current King: {kingId}</p>
                    <p>Current Poolsize: {poolSize}</p>
                    <p>Entrance Fee: {Fee}</p>
    
                </Card>
            </div>
        );
    }
    changeStatePoolsize(event) {
        /*因為所有的組件改變時都會呼叫這個function
        所以這裡就不能像一開始一樣寫死的*/

        //首先要去抓目前發生改變的組件的name
        let changeName = event.target.name
        //再把他目前的value拿去更改state
        this.setState({ [changeName]: event.target.value })
    }

    submitForm(event) {
        // TODO
        // create Pool
        
        console.log(`獎池大小：${this.state.selectpoolsize}`)
        console.log('Create a room ...')
        event.preventDefault()
    }

    render() {
        let rooms = [];
        let roomName;
        let hill;
        for (i = 0; i < this.state.totalPools; i++) {
            roomName = 'Room: ' + roomNumbers[i]
            hill = this.renderPool(roomName, kings[i], poolPrices[i], 1);
            rooms.push(hill);
        }
        return (
            <div>
                <h1>Welcome to Kingslanding</h1>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label>Create a Room, Please choose poolsize:</label>
                        <select id="poolsize" name="selectpoolsize"
                            value={this.state.selectpoolsize}
                            onChange={this.changeStatePoolsize} >
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                        <input type="submit" hidden="" />
                    </div>
                </form>
                {rooms}
            </div>
        );
    }
}

export default Main;