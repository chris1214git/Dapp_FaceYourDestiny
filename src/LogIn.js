import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './LogIn.css'

import Web3 from 'web3'
import { Anubis_ADDRESS, Anubis_ABI } from './config'

import { Button } from 'antd';

// const iron_throne = require('./picture/Iron-throne.jpg');
const pillsCard = require('./picture/pills.jpg');
const cowardCard = require('./picture/coward.jpg');
const cardHeight = 300;
const cardWidth = 400;

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
            web: '',
            Anubis: '',

            account: '',//this.props.account
            nickName: '',
            nickName2: '',//this.props.nickName,
            coward:false,
        }

    }

    componentDidMount() {
        setTimeout(this.loadBlockchainData.bind(this),1);
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
        const accounts = await web3.eth.getAccounts();
        const Anubis = new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)

        this.setState({ web3: web3 });
        this.setState({ account: accounts[0] });
        this.setState({ Anubis: Anubis });

        const webNickName = await this.state.Anubis.methods.Maat(this.state.account).call();
        if (webNickName) {
            this.setState({ nickName2: webNickName.name })
            console.log("Hi", webNickName.name)
        }

        setTimeout(this.loadBlockchainData.bind(this),10000);
    }

    
    setNickName = (nickName) => {
        this.setState({ nickName2: nickName })
        this.state.Anubis.methods.createEgyption(this.state.account, nickName).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.log("set nick name successfully!")
                console.log(receipt)
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setNickName(this.state.nickName);
        // this.setState({ nickName2: this.state.nickName })
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    nextPath(path) {
        this.props.history.push(path);
    }
    clickCoward(){
        this.setState({coward:true})
    }

    render() {
        return (
            <div style={sectionStyle}>
                <div className='container'>
                    <div className='centered'>
                        <h1>~ Welcome, Warriors ~</h1>
                    </div>
                    <h3>It is impossible to win the victory unless you dare to battle!</h3>
                    {this.state.nickName2 === '' &&
                        <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                            Say your name:
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
                    {this.state.nickName2 !== '' && <h3>{this.state.nickName2}: Are you ready to fight??</h3>}
                    {this.state.nickName2 !== '' && <img src={pillsCard} height={cardHeight} width={cardWidth} alt="pills"/>}
                    {this.state.nickName2 !== '' && <br></br>}
                    {this.state.nickName2 !== '' && <Button type="primary" onClick={() => this.nextPath('/main')}>GO</Button>}
                    {this.state.nickName2 !== '' && <Button type="primary" onClick={() => this.clickCoward()}> No I am a chicken</Button>}
                    {this.state.coward && <h3>You Coward!</h3>}
                    {this.state.coward && <img src={cowardCard} height={cardHeight} width={cardWidth} alt="coward"/>}
                </div>
            </div>
        )
    }
}

export default withRouter(LogIn);