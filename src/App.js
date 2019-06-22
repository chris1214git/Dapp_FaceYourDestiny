import React, { Component } from 'react';
import Game from "./Game";
import Main from "./Main";
import Web3 from 'web3'

import LogIn from "./LogIn";
// import LogInWrapper from "./LogInWrapper"

import About from "./About";
import { BrowserRouter, HashRouter, Router, Route, Link } from "react-router-dom"
import { Anubis_ADDRESS, Anubis_ABI } from './config'

const metadata = require('./picture/Anubis.sol');
const abi = metadata.abi;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      nickName: '',
      pools: [],
      pyramidCounter: '',
      enemyNickName: 'white walker',
      Anubis: '',
      myRoomId: 0,
      myPyramid: ''
    };
  }

  componentWillMount() {
    this.loadBlockchainData();

    //refresh
    setTimeout(this.loadPyramids.bind(this), 1000)
    setTimeout(this.getmyPyramid.bind(this), 1000)
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

  setNickName = (nickName) => {
    this.setState({ nickName: nickName })
    this.state.Anubis.methods.createEgyption(this.state.account, nickName).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("set nick name successfully!")
        console.log(receipt)
      })
  }

  createPool = (poolSize) => {
    this.state.Anubis.methods.createPyramid(this.state.account, poolSize).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("create Pool successfully!")
        console.log(receipt)
      })
    // should be in /game
  }

  selectBattle = (roomId) => {
    this.state.Anubis.methods.goIntoPyramid(this.state.account, roomId).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("Go into Pyramid successfully!")
        console.log(receipt)
      })
  }

  render() {
    return (
      // <HashRouter>
      <BrowserRouter>
        <div>
          <button onClick={this.loadPyramids.bind(this)}>
            Start loading
          </button>
          <p>{this.state.account}</p>
          <p>nickName: {this.state.nickName}</p>
          <ul>
            <li><Link to="/">LogIn</Link></li>
            <li><Link to="/main">Main</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <hr />
          <Route exact path="/" render=
            // { (props)=> <LogInWrapper 
            //     Anubis={this.state.Anubis}
            //     setNickName={this.setNickName}
            // />}
            {
              (props) => <LogIn
                account={this.state.account}
                nickName={this.state.nickName}
                setNickName={this.setNickName} />
            }
          />

          <Route exact path="/main" render={
            (props) => <Main
              account={this.state.account}
              pools={this.state.pools}
              totalPools={this.state.pyramidCounter}
              Anubis={this.state.Anubis}
              myRoomId={this.state.myRoomId}
              myPyramid={this.state.myPyramid}
              isKing={this.state.isKing}
              // selectGame={this.}
              createPool={this.createPool}
              selectBattle={this.selectBattle}
            />
          } />
          <Route exact path="/game" render={
            (props) => <Game
              account={this.state.account}
              Anubis={this.state.Anubis}
              myRoomId={this.state.myRoomId}
              myPyramid={this.state.myPyramid}
              isKing={this.state.isKing}
            />
          } />
          <Route exact path="/about" component={About} />
        </div>
      </BrowserRouter>
      /* </HashRouter> */
    );
  }
}

export default App;
//<h1>Andy is so handsome</h1>
