import React, { Component } from 'react';
// import { Row, Col, Card} from 'antd';
import { Card } from 'antd';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
let i=0;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectpoolsize: 0,
            pools: this.props.pools,
            totalPools: this.props.totalPools
        };

        this.changeStatePoolsize = this.changeStatePoolsize.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    renderPool(roomName, kingId, poolSize, Fee, key) {
        return (
            <div key={key} >
                <Card title={roomName} extra={<a href="/game">Battle</a>} style={{ width: 300 }}>
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
        console.log("TOTOT",this.state.totalPools)

        let rooms = [];
        let roomName;
        let hill;

        for (i = 0; i < this.state.totalPools; i++) {
            roomName = 'Room: ' + i
            hill = this.renderPool(roomName, this.state.pools[i].pharaoh.toString(), Number(this.state.pools[i].pyramidHeight.toString()), 1, i);
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
                {/* {this.state.pools.map((pool, key) => {
                    return (
                        renderPool(roomName, kingId, poolSize, Fee, key)
                    )
                })} */}
                {rooms}
            </div>
        );
    }
}

export default Main;