import React, { Component } from 'react';
// import './LogIn.css'

import NowTime from './NowTime'

const iron_throne = require('./picture/Iron-throne.jpg');

let sectionStyle = {

    // background-repeat: 'no-repeat',
    // background-attachment: fixed,
    backgroundPosition: 'center',
    width: '88%',
    height: '800px',
    backgroundSize: 'cover',
    // opacity: 0.5,
    // makesure here is String确保这里是一个字符串，以下是es6写法
    // backgroundImage: `url(${iron_throne})`
};

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleTimeString(),
            nickName: this.props.nickName,
            nickName2: '',
            account: this.props.account
        }

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.setNickName(this.state.nickName);
        this.setState({nickName2:this.state.nickName})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (

            <div style={sectionStyle}>
                <div className='container'>
                    <NowTime />
                    <h1>It is impossible to win the race unless you venture to run, impossible to win the victory unless you dare to battle.</h1>
                    <p>Your account: {this.state.account}</p>
                    {this.state.nickName2 === ''&&
                    <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                        <input
                            type="text"
                            name="nickName"
                            style={{ flex: '10', padding: '5px' }}
                            placeholder="Add nickName ..."
                            // value={this.state.title}
                            onChange={this.onChange}
                        />
                        <input
                            type="submit"
                            value="Submit"
                            className="btn"
                            style={{ flex: '1' }}
                        />
                    </form>}
                    <p>NickName: {this.state.nickName2}</p>
                </div>

                {/* <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <section className="main">
                    <h1>Welcome To My Site</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto amet
                        est, nihil laborum laboriosam quaerat exercitationem incidunt corrupti?
                        Nam, harum?
                    </p>
                    <a href="#" className="btn">Read More</a>
                </section> */}
            </div>
        )
    }
}

export default LogIn;