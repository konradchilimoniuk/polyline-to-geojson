import React, { Component } from 'react'

export class SectionOption extends Component {
    render() {
        return (
            <>
                {this.props.show && (<div className="section-option">
                    <label htmlFor={this.props.id}>{this.props.title}</label>
                    <div className="select-wrapper">
                        <select id={this.props.id} name={this.props.id} value={this.props.value} onChange={this.props.onChange}>
                            <option value={null}></option>
                            {this.props.columns.map((column, index) => <option key={index} value={index}>{column}</option>)}
                        </select>
                    </div>
                </div>)}
            </>
        )
    }
}

export default SectionOption
