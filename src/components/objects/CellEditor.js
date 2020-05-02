import React, { Component } from 'react'
import Tooltip from './Tooltip'

export class CellEditor extends Component {
    render() {
        return (
            <td>
                {this.props.value.length > 27 ? `${this.props.value.substring(0, 26)}...` : this.props.value}
                {this.props.value.length > 27 && <Tooltip>{this.props.value}</Tooltip>}
            </td>
        )
    }
}

export default CellEditor
