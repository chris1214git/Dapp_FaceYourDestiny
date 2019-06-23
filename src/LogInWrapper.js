import React, { Component } from 'react';
import LogIn from "./LogIn";
import Web3 from 'web3'
import { Anubis_ADDRESS, Anubis_ABI } from './config'

class LogInWrapper extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        account: '',
        nickName: '',
      };
    }
   // Do asynchronous action here
   async componentDidMount() {
      try {
         const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
         const accounts = await web3.eth.getAccounts();

         const Anubis = new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)

         this.setState({ account: accounts[0] });
         
         const webNickName = await Anubis.methods.Maat(this.state.account).call();
         if (webNickName) {
           this.setState({ nickName: webNickName.name })
           console.log("wrapper",webNickName)
         }
      } catch (err) {
         // error handling
      }
   }

   render() {
      return <LogIn
         account={this.state.account}
         nickName={this.state.nickName}
         setNickName={this.props.setNickName}
      />;
   }

}

export default LogInWrapper;