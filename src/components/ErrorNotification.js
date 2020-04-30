import React, { Component } from 'react'

export class ErrorNotification extends Component {
    componentDidMount() {
        setTimeout(() => this.props.removeError(this.props.index), 5000);
    }

    componentWillUnmount() {
        clearTimeout();
    }

    render() {
        return (
            <div className="error">{this.props.message} <div className="close" onClick={() => this.props.removeError(this.props.index)}/></div>
        )
    }
}

export default ErrorNotification
