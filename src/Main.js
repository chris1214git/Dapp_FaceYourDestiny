import React, { Component } from 'react';
import { Card } from 'antd';
import ShowMyRoom from './ShowMyRoom';

import { withRouter } from 'react-router-dom';


import Web3 from 'web3'
import { Anubis_ADDRESS, Anubis_ABI } from './config'


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
let i = 0;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: "",
            Anubis: "",
            account: "",
            nickName: "",

            pyramidCounter: "",
            pools: "",

            selectpoolsize: 0,
            myRoomId: "",
            myPyramid: "",
            isKing: "",

            createPool: "",
            selectBattle: "",
        };

        this.changeStatePoolsize = this.changeStatePoolsize.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }


    componentDidMount() {
        this.loadBlockchainData();

        //refresh
        setTimeout(this.getmyPyramid.bind(this), 1000)
        setTimeout(this.loadPyramids.bind(this), 1000)
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts();
        const Anubis = new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)

        this.setState({ web3: web3 });
        this.setState({ account: accounts[0] });
        this.setState({ Anubis: Anubis });

        const pyramidCounter = await Anubis.methods.pyramidCounter().call()
        console.log("pyramidCounter", Number(pyramidCounter.toString()))
        this.setState({ pyramidCounter: Number(pyramidCounter.toString()) });

        for (let i = 1; i < this.state.pyramidCounter; i += 1) {
            const pyramid = await Anubis.methods.Sahara(i).call()
            this.setState({
                pools: [...this.state.pools, pyramid]
            })
            console.log("The %d-th pyramid", i, pyramid)
        }

        const webNickName = await this.state.Anubis.methods.Maat(this.state.account).call();
        if (webNickName) {
            this.setState({ nickName: webNickName.name })
            console.log("Hi", webNickName.name)
        }
    }

    async loadPyramids() {

        // get contract
        const Anubis = this.state.Anubis;
        const pyramidCounter = await Anubis.methods.pyramidCounter().call()//.then();
        this.setState({ pyramidCounter: Number(pyramidCounter.toString()) });
        this.setState({ pools: [] })
        console.log("pyramidCounter:", Number(pyramidCounter.toString()))
        for (let i = 1; i < pyramidCounter; i += 1) {
            const pyramid = await Anubis.methods.Sahara(i).call()
            this.setState({
                pools: [...this.state.pools, pyramid]
            })
            // console.log("The %d-th pyramid", i, pyramid)
        }

        // refresh every 10 second
        setTimeout(this.loadPyramids.bind(this), 10000)
    }

    async getmyPyramid() {
        console.log("account", this.state.account);

        // get contract
        const Anubis = this.state.Anubis;
        let myRoomId = await Anubis.methods.getmyPyramid(this.state.account).call()
        myRoomId = Number(myRoomId.toString());
        console.log("My Room ID", myRoomId)
        this.setState({ myRoomId })

        if (myRoomId !== 0) {
            let myPyramid = await Anubis.methods.Sahara(myRoomId).call();

            this.setState({ myPyramid });
            console.log("My pyramid:", myPyramid)
            let isKing = -1;

            if (myPyramid.pharaoh === this.state.account) {
                console.log("You are pharaoh")
                let isKing = true;
                this.setState({ isKing })
            } else {
                let isKing = false;
                this.setState({ isKing })
            }

            if (isKing) {
                if (myPyramid.challenger !== 0) {
                    let enemy = await Anubis.methods.Maat(myPyramid.challenger).call()
                    let enemyNickName = enemy.name;
                    this.setState({ enemyNickName })
                }
            } else {
                let enemy = await Anubis.methods.Maat(myPyramid.pharaoh).call()
                let enemyNickName = enemy.name;
                this.setState({ enemyNickName })
            }

        }

        setTimeout(this.getmyPyramid.bind(this, this.state.account), 10000)
    }

    selectBattle = (roomId) => {
        console.log("Going into Pyramid!")
        this.state.Anubis.methods.goIntoPyramid(this.state.account, roomId).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.log("Go into Pyramid successfully!")
                console.log(receipt)
            })
    }

    changeStatePoolsize(event) {
        /*因為所有的組件改變時都會呼叫這個function
        所以這裡就不能像一開始一樣寫死的*/
        let changeName = event.target.name
        this.setState({ [changeName]: event.target.value })
    }

    createPool = (poolSize) => {
        this.state.Anubis.methods.createPyramid(this.state.account, poolSize).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.log("create Pool successfully!")
                console.log(receipt)
            })
        // should be in /game
    }

    submitForm(event) {
        console.log(`獎池大小：${this.state.selectpoolsize}`)
        console.log('Create a room ...')
        event.preventDefault()
        this.createPool(this.state.selectpoolsize);
        this.props.history.push('/game');
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

    render() {
        let rooms = [];
        let roomName;
        let hill;

        for (i = 0; i < this.state.pyramidCounter - 1; i++) {
            roomName = 'Room: ' + i
            if(this.state.pools.length===i) break
            if(Number(this.state.pools[i].challenger.toString())===0){                
                hill = this.renderPool(roomName, this.state.pools[i].pharaoh.toString(), Number(this.state.pools[i].pyramidHeight.toString()), 1, i);
                rooms.push(hill);    
            }
        }

        return (
            <div>
                <h1>Welcome to Kingslanding</h1>

                {/* In some room, show my room */}
                {this.state.myRoomId !== 0 &&
                    <ShowMyRoom
                        roomId={this.state.myRoomId}
                        kingId={this.state.myPyramid.pharaoh}
                        challengerId={this.state.myPyramid.challenger}
                        poolSize={this.state.myPyramid.pyramidHeight}
                        isKing={this.state.isKing}
                    />}

                {/* Not in any room, show every room without challenger */}
                {this.state.myRoomId === 0 &&
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
                {this.state.myRoomId === 0 && rooms}
            </div>
        );
    }
}

export default withRouter(Main);