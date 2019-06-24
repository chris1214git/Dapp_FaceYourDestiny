import React, { Component } from 'react';
import Game from "./Game";
import Main from "./Main";

import LogIn from "./LogIn";

import About from "./About";
import { BrowserRouter, Route, Link } from "react-router-dom" //, HashRouter, Router

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

  render() {
    return (
      // <HashRouter>
      <BrowserRouter>
        <div>
          <hr />
          <Route exact path="/" component={LogIn}/>
          <Route exact path="/main" component={Main}/>
          <Route exact path="/game" component={Game}/>
          <Route exact path="/about" component={About}/>
        </div>
        <ul>
            <li><Link to="/">LogIn</Link></li>
            <li><Link to="/main">Main</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
      </BrowserRouter>
      /* </HashRouter> */
    );
  }
}

export default App;
//<h1>Andy is so handsome</h1>
