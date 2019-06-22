import React, { Component } from 'react';
import { Card } from 'antd';
import ShowMyRoom from './ShowMyRoom';

import {withRouter} from 'react-router-dom';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
let i = 0;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
            selectpoolsize: 0,
            pools: this.props.pools,
            totalPools: this.props.totalPools,
            Anubis: this.props.Anubis,
            myRoomId: this.props.myRoomId,
            myPyramid: this.props.myPyramid,
            isKing: this.props.isKing,

            createPool: this.props.createPool,
            selectBattle: this.props.selectBattle,
        };

        this.changeStatePoolsize = this.changeStatePoolsize.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
    
    renderPool(roomName, kingId, poolSize, Fee, key) {
        return (
            <div key={key} >
                <Card title={roomName} extra={<a onClick={() => this.selectBattle(i)} href="/game">Battle</a>} style={{ width: 300 }}>
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
        let changeName = event.target.name
        this.setState({ [changeName]: event.target.value })
    }

    submitForm(event) {
        console.log(`獎池大小：${this.state.selectpoolsize}`)
        console.log('Create a room ...')
        event.preventDefault()
        this.props.createPool(this.state.selectpoolsize);
        this.props.history.push('/game');
    }

    render() {
        console.log("TOTOT", this.state.totalPools)

        let rooms = [];
        let roomName;
        let hill;

        for (i = 0; i < this.state.totalPools-1; i++) {
            roomName = 'Room: ' + i
            hill = this.renderPool(roomName, this.state.pools[i].pharaoh.toString(), Number(this.state.pools[i].pyramidHeight.toString()), 1, i);
            rooms.push(hill);
        }
        
        return (
            <div>
                <h1>Welcome to Kingslanding</h1>
                
                {this.state.myRoomId!==0 &&
                <ShowMyRoom
                    roomId= {this.state.myRoomId}
                    kingId= {this.state.myPyramid.pharaoh}
                    challengerId= {this.state.myPyramid.challenger}
                    poolSize={this.state.myPyramid.pyramidHeight}
                    isKing= {this.state.isKing}
                />}

                {this.state.myRoomId===0 &&
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
                </form>}
                {this.state.myRoomId===0 && rooms}
            </div>
        );
    }
}

export default withRouter(Main);