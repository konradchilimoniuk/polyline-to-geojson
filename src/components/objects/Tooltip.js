import React, { Component } from 'react'

export class Tooltip extends Component {
    render() {
        return (
            <span className="tooltip">
                {this.props.children}
            </span>
        )
    }
}

export default Tooltip