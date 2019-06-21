import React, { Component } from 'react';
import Game from "./Game";
import Main from "./Main";
import Web3 from 'web3'

import LogIn from "./LogIn";
import About from "./About";
import { BrowserRouter, HashRouter, Router, Route, Link } from "react-router-dom"
import { Anubis_ADDRESS, Anubis_ABI } from './config'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      nickName: '',
      pools: [],
      pyramidCounter: ''
    };
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
    setTimeout(this.loadPyramids.bind(this), 1000)
  }

  componentDidMount() {
    this.loadBlockchainData();

    // setTimeout(this.loadPyramids.bind(this),10000)

  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    const accounts = await web3.eth.getAccounts();
    const Anubis = new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)

    this.setState({ account: accounts[0] });
    this.setState({ Anubis: Anubis });

    const pyramidCounter = await Anubis.methods.pyramidCounter().call()//.then();
    this.setState({ pyramidCounter: Number(pyramidCounter.toString()) });

    for (let i = 0; i < pyramidCounter; i += 1) {
      const pyramid = await Anubis.methods.Sahara(i).call()
      this.setState({
        pools: [...this.state.pools, pyramid]
      })
      console.log("The i-th pyramid", pyramid)
    }

    console.log("pyramidCounter", this.state.pyramidCounter)
    console.log("Pools", this.state.pools)
  }

  setNickName = (nickName) => {
    this.setState({ nickName: nickName })
  }


  render() {
    return (

      // <HashRouter>
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">LogIn</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <hr />
          <Route exact path="/" render={
            (props) => <LogIn 
            account={this.state.account} 
            nickName={this.state.nickName} 
            setNickName={this.setNickName}
            />
          } />

          <Route exact path="/home" render={
            (props) => <Main pools={this.state.pools} totalPools={this.state.pyramidCounter} />
          } />
          <Route exact path="/game" render={
            (props) => <Game poolSize={3000} enemyNickName={'Snow'} />
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
