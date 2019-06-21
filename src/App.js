import React, { Component } from 'react';
import Game from "./Game";
import Main from "./Main";
import Web3 from 'web3'

import LogIn from "./LogIn";
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
      enemyNickName: 'white walker'
    };
  }

  componentWillMount() {
    this.loadBlockchainData();
    setTimeout(this.loadPyramids.bind(this),10000)
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ web3: web3 });
    const Anubis = new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)

    this.setState({ account: accounts[0] });
    this.setState({ Anubis: Anubis });

    const pyramidCounter = 1
    await Anubis.methods.pyramidCounter().call().then(console.log)//.toString()//.then();
    console.log("pyrrrr", pyramidCounter)
    this.setState({ pyramidCounter: Number(pyramidCounter.toString()) });

    for (let i = 0; i < 1; i += 1) {
      const pyramid = await Anubis.methods.Sahara(i).call()
      this.setState({
        pools: [...this.state.pools, pyramid]
      })
      console.log("The i-th pyramid", pyramid)
    }

    const webNickName = await this.state.Anubis.methods.Maat(this.state.account).call();
    if (webNickName) {
      this.setState({ nickName: webNickName.name })
      console.log("Hi", webNickName.name)
    }
    // console.log("pyramidCounter", this.state.pyramidCounter)
    // console.log("Pools", this.state.pools)
  }

  async loadPyramids() {

    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    const Anubis = new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)
    const pyramidCounter = await Anubis.methods.pyramidCounter().call()//.then();
    this.setState({ pyramidCounter: Number(pyramidCounter.toString()) });

    for (let i = 0; i < pyramidCounter; i += 1) {
      const pyramid = await Anubis.methods.Sahara(i).call()
      this.setState({
        pools: [...this.state.pools, pyramid]
      })
      console.log("The i-th pyramid", pyramid)
    }
    setTimeout(this.loadPyramids.bind(this), 10000)
  }

  setNickName = (nickName) => {
    this.setState({ nickName: nickName })
    this.state.Anubis.methods.createEgyption(this.state.account, nickName).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("set nick name successfully!")
        console.log(receipt)
      })
  }

  createPool = (poolSize) =>{
    this.state.Anubis.methods.createPyramid(this.state.account, poolSize).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log("create Pool successfully!")
      console.log(receipt)
    })
    // should be in /game
  }

  render() {
    return (
      // <HashRouter>
      <BrowserRouter>
        <div>
          <p>{this.state.account}</p>
          <p>nickName: {this.state.nickName}</p>
          <ul>
            <li><Link to="/">LogIn</Link></li>
            <li><Link to="/main">Main</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <hr />
          <Route exact path="/" render={
            (props) => <LogIn
              account={this.state.account}
              nickName={this.state.nickName}
              setNickName={this.setNickName} />
          } />

          <Route exact path="/main" render={
            (props) => <Main
              pools={this.state.pools}
              totalPools={this.state.pyramidCounter}
              Anubis={this.state.Anubis}
              createPool={this.createPool}
              // selectGame={this.}
            />
          } />
          <Route exact path="/game" render={
            (props) => <Game
              poolSize={3000}
              enemyNickName={this.state.enemyNickName} 
              Anubis={this.state.Anubis}
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
