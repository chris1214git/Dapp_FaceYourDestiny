import React, { Component } from 'react';
import LogIn from "./LogIn";

class LogInWrapper extends React.Component {

    // Do asynchronous action here
    async componentDidMount() {
       try {
          const apiValue = await get('/some/api');
          this.setState({ apiValue })
       } catch(err) {
          // error handling
       }
    }

    render() {
        const { apiValue } = this.state; 
        return <LogIn 
        account={this.state.account}
        nickName={this.state.nickName}
        setNickName={this.setNickName}
        />;
    }

}

export default LogInWrapper;