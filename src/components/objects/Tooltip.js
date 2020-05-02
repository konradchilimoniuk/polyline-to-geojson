import React, { Component, createRef } from 'react'

export class Tooltip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            top: 0,
            isVisible: false
        }

        this.tooltipRef = createRef();
    }

    setCoordinates = coordinates => {
        let elementHeightWithOffset = this.tooltipRef.current.scrollHeight + coordinates.top - 4;
        let left = coordinates.left - 5;
        let top = coordinates.top - 4;
        this.setState({
            left: left,
            top: coordinates.parentHeight > elementHeightWithOffset ? top : top - (elementHeightWithOffset - coordinates.parentHeight)
        })
    }

    show = () => {
        this.setState({ isVisible: true })
    }

    hide = () => {
        this.setState({ isVisible: false })
    }

    render() {
        return (
            <span ref={this.tooltipRef} className={this.state.isVisible ? "tooltip show" : "tooltip"} style={{left: this.state.left, top: this.state.top}}>
                {this.props.children}
            </span>
        )
    }
}

export default Tooltip