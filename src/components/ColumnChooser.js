import React, { Component } from 'react'
import SectionOption from './objects/SectionOption'

export class ColumnChooser extends Component {
    handleChangeSectionOption = e => {
        var value = parseInt(e.target.value);
        if(isNaN(value)) value = null
        this.props.handleChangeOptionValue(e.target.name, value);
    }

    render() {
        return (
            <div className="section">
                <h2>Choose columns</h2>
                <div className="section-content">
                    Columns for Polyline, start timestamp and end timestamp should be assigned automatically if they were found. You can modify it below if it was done incorrectly.
                </div>
                <div className="section-content">
                    <SectionOption id="polylineColumnId" title="Polyline" value={this.props.polylineColumnId} onChange={this.handleChangeSectionOption} columns={this.props.columns} show={true} />

                    <div className="section-option">
                        <label htmlFor="includePathAnimation">Include Path Animation?</label>
                        <input type="checkbox" id="includePathAnimation" name="includePathAnimation" checked={this.props.includePathAnimation} onChange={e => this.props.handleChangeOptionValue(e.target.name, e.target.checked)} />
                        <div className="section-description">
                            Checking this checkbox include start and end timestamps in GeoJSON coordinates. Thanks to this, animating path through time will be possible.
                        </div>
                    </div>

                    <SectionOption id="startTimestampColumnId" title="Start Timestamp" value={this.props.startTimestampColumnId} onChange={this.handleChangeSectionOption} columns={this.props.columns} show={this.props.includePathAnimation} />
                    <SectionOption id="endTimestampColumnId" title="End Timestamp" value={this.props.endTimestampColumnId} onChange={this.handleChangeSectionOption} columns={this.props.columns} show={this.props.includePathAnimation} />
                </div>
            </div>
        )
    }
}

export default ColumnChooser
