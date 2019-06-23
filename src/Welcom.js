import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

class Welcome extends Component {

    nextPath(path) {
        this.props.history.push("/login");
    }

    render() {
        {setTimeout(this.nextPath.bind(this),5000)}
        return (
            <div style={sectionStyle}>
                <div className='container'>
                    <div className='centered'>
                        <h1>~ Welcome, Warriors ~</h1>
                    </div>
                    <h3>It is impossible to win the victory unless you dare to battle!</h3>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);