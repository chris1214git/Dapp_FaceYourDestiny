import React, { Component } from 'react';
import Game from "./Game";
import Main from "./Main";
import Web3 from 'web3'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { account: '',
                    value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    const accounts = await web3.eth.getAccounts();
    const nickName = '';
    this.setState({ account: accounts[0],
                    nickName: nickName });
  }

  handleChange(event) {
    this.setState({nickName: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.nickName);
    event.preventDefault();
  }
  
  submitFormHandler = event => {
    event.preventDefault();
    this.setState({nickName: this.refs.nickname.value})
  }

  render() {
    return (
      <div className='container'>
        <p>Your account: {this.state.account}</p>

        <form onSubmit={this.submitFormHandler}>
          <div>
            <input type="text" name="name" ref="nickname" placeholder="Enter your NickName..."/>
          </div>
        </form>

        <h1>NickName: {this.state.nickName}</h1>
        <Main />
        <Game />
      </div>
    );
  }
}

export default App;
//<h1>Andy is so handsome</h1>
