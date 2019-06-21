
import React, { Component } from 'react';


class Loading extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }

    render() {
        return (
            <div class="loading">
                <span>Loading...</span>
            </div>
        )
    }
}

export default Loading;