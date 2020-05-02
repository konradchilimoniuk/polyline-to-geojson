import React, { Component } from 'react'
import Tooltip from './Tooltip'

export class CellEditor extends Component {
    tdRef = React.createRef();
    tooltipRef = React.createRef();

    componentDidMount() {
        if(this.tooltipRef.current !== null && this.tdRef.current !== null) {
            let coordinates = {
                left: this.tdRef.current.offsetLeft,
                top: this.tdRef.current.offsetTop,
                parentHeight: this.tdRef.current.offsetParent.offsetHeight
            }
            this.tooltipRef.current.setCoordinates(coordinates);
        }
    }

    handleOnMouseEnter = e => {
        e.preventDefault();
        if(this.tooltipRef.current !== null)
            this.tooltipRef.current.show();
    }

    handleOnMouseLeave = e => {
        e.preventDefault();
        if(this.tooltipRef.current !== null)
            this.tooltipRef.current.hide();
    }

    render() {
        return (
            <td ref={this.tdRef} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                {this.props.value.length > 27 ? <>
                    {this.props.value.substring(0, 26)}...
                    <Tooltip ref={this.tooltipRef}>{this.props.value}</Tooltip>
                </> : this.props.value}
            </td>
        )
    }
}

export default CellEditor
