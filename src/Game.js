// TODO
// delete card, game process
// emoji


import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';

import Web3 from 'web3'
import { Anubis_ADDRESS, Anubis_ABI } from './config'


const emperorCard = require('./picture/emperorCard.jpg');
const citizenCard = require('./picture/citizenCard.jpg');
const slaveCard = require('./picture/slaveCard.jpg');
const pokerBackCard = require('./picture/pokerBack.png');
const cardHeight = 200;
const cardWidth = 120;

const emoji1 = require('./picture/emoji_1.jpg');
const emoji2 = require('./picture/emoji_2.jpg');
const emoji3 = require('./picture/emoji_3.jpg');
const emoji4 = require('./picture/emoji_4.jpg');

let cardTypes = [];
cardTypes.push(pokerBackCard);
cardTypes.push(slaveCard);
cardTypes.push(citizenCard);
cardTypes.push(emperorCard);

let emojis = []
emojis.push(emoji1);
emojis.push(emoji2);
emojis.push(emoji3);
emojis.push(emoji4);


class Game extends Component {
	constructor(props) {
		super(props);
		let cardstate = Array(5).fill(0); //not selected yet

		this.state = {
			web3: "",
			Anubis: "",
			account: "",

			myRoomId: "",
			myPyramid: "",
			isKing: "",

			roundx: 0,
			roundHistory: Array(5).fill(-1),
			gameResult: 0, // -1:lose 1:win
			enemyCard: 0,

			nickName: "",
			enemyNickName: "",
			cardstate: cardstate,
			finish: true,
		};
	}

	componentDidMount() {

		this.loadBlockchainData();
		setTimeout(this.getmyPyramid.bind(this), 1000)
		setTimeout(this.askRoundX.bind(this), 10000)
	}

	async loadBlockchainData() {
		const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
		const accounts = await web3.eth.getAccounts();
		const Anubis = await new web3.eth.Contract(Anubis_ABI, Anubis_ADDRESS)

		this.setState({ web3: web3 });
		this.setState({ account: accounts[0] });
		this.setState({ Anubis: Anubis });

		const webNickName = await this.state.Anubis.methods.Maat(this.state.account).call();
		if (webNickName) {
			this.setState({ nickName: webNickName.name })
			console.log("Hi", webNickName.name)
		}

		let myRoomId = await Anubis.methods.getmyPyramid(this.state.account).call()
		myRoomId = Number(myRoomId.toString());
		console.log("My Room ID", myRoomId)
		this.setState({ myRoomId })
	}

	async getmyPyramid() {

		// get contract
		const Anubis = this.state.Anubis;
		let myRoomId = this.state.myRoomId;

		if (myRoomId !== 0) {
			let myPyramid = await Anubis.methods.Sahara(myRoomId).call();
			let round = myPyramid.round

			this.setState({ myPyramid });
			this.setState({ roundx: round })
			console.log("My pyramid:", myPyramid)
			let isKing = -1;

			if (myPyramid.pharaoh === this.state.account) {
				isKing = true;
				this.setState({ isKing })
			} else {
				isKing = false;
				this.setState({ isKing })
			}

			let enemyNickName = ""
			if (isKing) {
				if (myPyramid.challenger !== 0) {
					let enemy = await Anubis.methods.Maat(myPyramid.challenger).call()
					enemyNickName = enemy.name;
					this.setState({ enemyNickName })
				}
			} else {
				let enemy = await Anubis.methods.Maat(myPyramid.pharaoh).call()
				enemyNickName = enemy.name;
				this.setState({ enemyNickName })
			}

			if (Number(myPyramid.challenger.toString()) !== 0 && this.state.roundx === 0) {
				this.setState({ gameResult: 0 })
			}

			console.log("Is King?", isKing)
		}

		setTimeout(this.getmyPyramid.bind(this, this.state.account), 10000)
	}
	
	async askRoundX() {
		
		const Anubis = this.state.Anubis;
		const roundXRes = await Anubis.methods.getBattleHistory(this.state.myRoomId, this.state.roundx === 0 ? 0 : this.state.roundx - 1).call();
		
		
		console.log("HI")
		console.log("Round %d result: %d", this.state.roundx===0?0:this.state.roundx-1, Number(roundXRes.toString()));
		this.setState({roundXRes:Number(roundXRes.toString())})

		if (this.state.roundXRes !== 4) {
			if (this.state.roundXRes === 3) {
				
				const roundHistory = this.state.roundHistory.slice();
				roundHistory[this.state.roundx] = 2; //citizen
				this.setState({ roundHistory });
			}
			else if (this.state.roundXRes >= 0 && this.state.roundXRes <= 2) {
				// end of game, show result
				const roundHistory = Array(5).fill(-1);
				this.setState({ roundHistory });
				
				//TODO: 
				console.log("roundXres",this.state.roundXRes)
				if (this.state.roundXRes === 0) {
					this.setState({ enemyCard: this.state.isKing ? 1 : 3 })
					this.setState({ gameResult: this.state.isKing ? -1 : 1 })
				} else if (this.state.roundXRes === 1) {
					this.setState({ enemyCard: this.state.isKing ? 2 : 3 })
					this.setState({ gameResult: this.state.isKing ? 1 : -1 })
				}
				else {
					this.setState({ enemyCard: this.state.isKing ? 1 : 2 })
					this.setState({ gameResult: this.state.isKing ? 1 : -1 })
				}
			}
		}
		console.log("enemyCard, gameresult",this.state.enemyCard,this.state.gameResult)
	// refresh every 10 second
	setTimeout(this.askRoundX.bind(this), 10000)
	}

clickCard(i) {
	const cardstate = this.state.cardstate.slice();
	cardstate[i] = 1;
	this.setState({ cardstate: cardstate });
	console.log(this.state.account, this.state.myRoomId, i !== 0)
	this.state.Anubis.methods.selectCard(this.state.account, this.state.myRoomId, i !== 0).send({ from: this.state.account })
		.once('receipt', (receipt) => {
			console.log("select card successfully!")
			console.log(receipt)
		})
}

clickEmoji(i) {
	console.log("click emoji", i);
}

renderMyCard(i, cardType) {
	return (
		<Col span={4}>
			<button type="button" >
				<img src={cardType} height={cardHeight} width={cardWidth}
					onClick={() => this.clickCard(i)} alt="card" />
			</button>
		</Col>
	)
}

renderMyEmoji(i) {
	return (
		<Col span={4}>
			<button type="button" >
				<img src={emojis[i]} height={cardHeight / 1.5} width={cardWidth / 1.3}
					onClick={() => this.clickEmoji(i)} alt="emoji" />
			</button>
		</Col>
	)
}
renderFinish() {
	return (
		<Col >
			<button type="button" >
				<a href="/main">Finished! Back to KingsLanding.</a>
			</button>
		</Col>
	)
}


render() {
	return (
		<div>
			<Row justify="space-around">
				<Col span={12} style={{ fontSize: 30 }}>Enemy: {this.state.enemyNickName}</Col>
				<Col span={8}>
				</Col>
				<Col span={4}>
					<Icon type="hourglass" />
				</Col>
			</Row>
			<h3>Poolprice: {this.state.myPyramid.pyramidHeight}</h3>
			<h1>Round {this.state.roundx}</h1>
			<Row type="flex" justify="center">
				<h1>Enemy Card</h1>
			</Row>

			<Row type="flex" justify="center">
				<img src={cardTypes[this.state.roundx === 0 ? 0 : this.state.gameResult === 0 ? 2 : this.state.enemyCard]} height={cardHeight} width={cardWidth} alt="enemyCard" />
			</Row>

			<Row type="flex" justify="center">
				<h1>Face the desitny, please choose one card</h1>
			</Row>
			<Row type="flex" justify="center">
				<h1>remain time: </h1>
			</Row>
			<Row type="flex" justify="center">
				{this.state.cardstate[0] === 0 && this.renderMyCard(0, this.state.isKing ? emperorCard : slaveCard)}
				{this.state.cardstate[1] === 0 && this.renderMyCard(1, citizenCard)}
				{this.state.cardstate[2] === 0 && this.renderMyCard(2, citizenCard)}
				{this.state.cardstate[3] === 0 && this.renderMyCard(3, citizenCard)}
				{this.state.cardstate[4] === 0 && this.renderMyCard(4, citizenCard)}
			</Row>
			<Row type="flex" justify="center">
				{this.renderMyEmoji(0)}
				{this.renderMyEmoji(1)}
				{this.renderMyEmoji(2)}
				{this.renderMyEmoji(3)}
			</Row>
			<Row type="flex" justify="center">
				{this.state.gameResult===1 && <h1>Congratulation You Win !</h1>}
				{this.state.gameResult===-1&& <h1>Sorry you are loser ~</h1>}
			</Row>
			<Row type="flex" justify="center">
				{this.state.gameResult !== 0 && this.renderFinish()}
			</Row>
		</div>
	);
}
}

export default Game;

//space around 