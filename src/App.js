import React, { Component } from 'react';
import Game from "./Game";
import Main from "./Main";
import Web3 from 'web3'
import NowTime from './NowTime'

import About from "./About";
import { HashRouter, Route, Link } from "react-router-dom"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      value: '',
      nickName: '',
      pools:''
    };

  }
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({
      account: accounts[0],
    });
  }

  submitFormHandler = event => {
    event.preventDefault();
    this.setState({ nickName: this.refs.nickname.value })
  }

  renderNickNameForm() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <div>
          <input type="text" name="name" ref="nickname" placeholder="Enter your NickName..." />
        </div>
      </form>
    );
  }

  render() {
    return (

      <HashRouter>
        <div className='container'>
          <NowTime time={new Date().toLocaleTimeString()} />
          <p>Your account: {this.state.account}</p>
          {console.log(this.state.nickName)}
          {(this.state.nickName === '') && this.renderNickNameForm()}
          <p>NickName: {this.state.nickName}</p>
        </div>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <hr />
          <Route exact path="/" render={(props) => <Main {...props} pools={1} totalPools={3} />} />
          <Route exact path="/game" render={(props) => <Game {...props} poolSize={3000} enemyNickName={'Snow'} />} />
          <Route exact path="/about" component={About} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
//<h1>Andy is so handsome</h1>
