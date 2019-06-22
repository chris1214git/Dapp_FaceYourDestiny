import React, { Component } from 'react';

import { Row, Col, Icon } from 'antd';
import { callExpression } from '@babel/types';

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
		let { name } = this.props;
		let cardstate = Array(5).fill(0); //not selected yet

		this.state = {
			account: this.props.account,
			Anubis: this.props.Anubis,
			myRoomId: this.props.myRoomId,
			myPyramid: this.props.myPyramid,
			isKing: this.props.isKing,

			roundx: 0,
			roundHistory: Array(5).fill(-1),
			gameResult: 0, // -1:lose 1:win

			myName: name,
			cardstate: cardstate,
			finish: true,
		};
	}

	componentDidMount() {
		setTimeout(this.askRoundX.bind(this), 10000)
	}

	async askRoundX() {
		console.log("Round %d", this.state.roundx);

		const Anubis = this.props.Anubis;
		const roundXRes = await Anubis.methods.getBattleHistory(this.state.myRoomId, this.state.roundx).call();
		console.log("Round x result", roundXRes);

		if (roundXRes !== 4) {
			if (roundXRes === 3) {
				this.setState({ roundx: (this.state.roundx + 1) })

				const roundHistory = this.state.roundHistory.slice();
				roundHistory[this.state.roundx] = 2; //citizen
				this.setState({ roundHistory });
			}
			else {
				// end of game, show result
				this.setState({ roundx: 0 })
				const roundHistory = Array(5).fill(-1);
				this.setState({ roundHistory });

				//TODO: 
				this.setState({ gameResult: -1 })
			}
		}

		// refresh every 10 second
		setTimeout(this.askRoundX.bind(this), 10000)
	}

	clickCard(i) {
		const cardstate = this.state.cardstate.slice();
		cardstate[i] = 1;
		this.setState({ cardstate: cardstate });
		console.log(this.state.account, this.state.myRoomId, i!==0)
		this.state.Anubis.methods.selectCard(this.state.account, this.state.myRoomId, i!==0).send({ from: this.state.account })
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
					<a href="/home">Finished! Back to KingsLanding.</a>
				</button>
			</Col>
		)
	}


	render() {
		return (
			<div>
				<Row justify="space-around">
					<Col span={12} style={{ fontSize: 30 }}>Enemy: {this.state.isKing? this.state.myPyramid.challenger: this.state.myPyramid.pharaoh}</Col>
					<Col span={8}>
					</Col>
					<Col span={4}>
						<Icon type="hourglass" />
					</Col>
				</Row>
				<h3>Poolprice: {this.state.myPyramid.pyramidHeight}</h3>
				<Row type="flex" justify="center">
					<h1>Enemy Card</h1>
				</Row>

				<Row type="flex" justify="center">
					<img src={cardTypes[this.state.roundx===0? 0:2]} height={cardHeight} width={cardWidth} alt="enemyCard" />
				</Row>

				<Row type="flex" justify="center">
					<h1>Face the desitny, please choose one card</h1>
				</Row>
				<Row type="flex" justify="center">
					<h1>remain time: </h1>
				</Row>
				<Row type="flex" justify="center">
					{this.renderMyCard(0, this.state.isKing? emperorCard:slaveCard)}
					{this.renderMyCard(1, citizenCard)}
					{this.renderMyCard(2, citizenCard)}
					{this.renderMyCard(3, citizenCard)}
					{this.renderMyCard(4, citizenCard)}
				</Row>
				<Row type="flex" justify="center">
					{this.state.gameResult !== 0 && this.renderFinish()}
				</Row>
				<Row type="flex" justify="center">
					{this.renderMyEmoji(0)}
					{this.renderMyEmoji(1)}
					{this.renderMyEmoji(2)}
					{this.renderMyEmoji(3)}
				</Row>
			</div>
		);
	}
}

export default Game;

//space around 