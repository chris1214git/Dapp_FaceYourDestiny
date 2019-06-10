import React, { Component } from 'react';

import { Row, Col, Card, Icon } from 'antd';

const emperorCard = require('./emperorCard.jpg');
const citizenCard = require('./citizenCard.jpg');
const slaveCard   = require('./slaveCard.jpg');
const pokerBackCard   = require('./picture/pokerBack.png');
const cardHeight = 200;
const cardWidth = 120;

let poolprice = 10000;
let enemy_emj = 0;
let enemy_card= 0;

class PlayerCard extends Component {
    constructor(props) {
        super(props);
        let { name } = this.props;
        this.state = { myName: name };
    }
    
    render() {
        return (
            <div>
                <Row justify="space-around">
                    <Col span={12}style={{fontSize:30}}>Player: {this.state.myName}</Col>
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
                    <img src={pokerBackCard} height={cardHeight} width={cardWidth}/>
                </Row>        

                <Row type="flex" justify="center">
                    <h1>Face the desitny, please choose one card</h1>
                </Row>        
                <Row type="flex" justify="center">
                    <h1>remain time: </h1>
                </Row>        
                <Row type="flex" justify="center">
                    <Col span={4}>
                        <button type="button" >
                            <img src={emperorCard} height={cardHeight} width={cardWidth}/>
                        </button>
                    </Col>
                    <Col span={4}>
                        <button type="button">
                            <img src={citizenCard} height={cardHeight} width={cardWidth}/>
                        </button>
                    </Col>
                    <Col span={4}>
                        <img src={citizenCard} alt='citizen' height={cardHeight} width={cardWidth}/>
                    </Col>
                    <Col span={4}>
                        <img src={citizenCard} alt='citizen' height={cardHeight} width={cardWidth}/>
                    </Col>
                    <Col span={4}>
                        <img src={citizenCard} alt='citizen' height={cardHeight} width={cardWidth}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PlayerCard;

//space around 