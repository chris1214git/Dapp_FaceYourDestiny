import React, { Component } from 'react';

import { Row, Col, Card, Icon } from 'antd';

const emperorCard = require('./emperorCard.jpg');
const citizenCard = require('./citizenCard.jpg');
const slaveCard = require('./slaveCard.jpg');
const pokerBackCard = require('./picture/pokerBack.png');
const cardHeight = 200;
const cardWidth = 120;

let poolprice = 10000;
let enemy_emj = 0;
let enemy_card = 0;

class Game extends Component {
	constructor(props) {
		super(props);
		let { name } = this.props;
		let cardstate = Array(5).fill(0); //not selected yet

		this.state = {
			myName: name,
			cardstate: cardstate,
			finish: true//false
		};
	}

	clickCard(i) {
		const cardstate = this.state.cardstate.slice();
		cardstate[i] = 1;
		this.setState({ cardstate: cardstate });
		console.log(this.state.cardstate)
	}

	renderMyCard(i, cardType) {
		return (
			<Col span={4}>
				<button type="button" >
					<img src={cardType} height={cardHeight} width={cardWidth}
						onClick={() => this.clickCard(i)} />
				</button>
			</Col>
		)
	}

	renderFinish() {
		return (
			<Col >
				<button type="button" >
					{/* <img src={cardType} height={cardHeight} width={cardWidth}
						onClick={() => this.clickCard(i)} /> */}
					<p>Finished! Back to KingsLanding.</p>
				</button>
			</Col>
		)
	}


	render() {
		return (
			<div>
				<Row justify="space-around">
					<Col span={12} style={{ fontSize: 30 }}>Player: {this.state.myName}</Col>
					<Col span={8}>
					</Col>
					<Col span={4}>
						<Icon type="hourglass" />
					</Col>
				</Row>
				<h3>Poolprice: {poolprice}</h3>
				<Row type="flex" justify="center">
					<h1>Enemy Card</h1>
				</Row>

				<Row type="flex" justify="center">
					<img src={pokerBackCard} height={cardHeight} width={cardWidth} />
				</Row>

				<Row type="flex" justify="center">
					<h1>Face the desitny, please choose one card</h1>
				</Row>
				<Row type="flex" justify="center">
					<h1>remain time: </h1>
				</Row>
				<Row type="flex" justify="center">
					{this.renderMyCard(0, emperorCard)}
					{this.renderMyCard(1, citizenCard)}
					{this.renderMyCard(2, citizenCard)}
					{this.renderMyCard(3, citizenCard)}
					{this.renderMyCard(4, citizenCard)}
				</Row>
				<Row type="flex" justify="center">
					{this.state.finish == true && this.renderFinish()}
				</Row>
			</div>
		);
	}
}

export default Game;

//space around 