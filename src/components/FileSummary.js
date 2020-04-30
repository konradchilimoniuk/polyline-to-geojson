import React, { Component } from 'react'

export class FileSummary extends Component {
    render() {
        return (
            <div className="section">
                <h2 className="success">File loaded successfully!</h2>
                <div className="section-content">
                    Found <span style={{fontWeight: "bold"}}>{this.props.dataLength}</span> rows and <span style={{fontWeight: "bold"}}>{this.props.columnsLength}</span> columns in uploaded file. Columns for Polyline, start timestamp and end timestamp should be assigned automatically if they were found. You can modify it below if it was done incorrectly.
                </div>
            </div>
        )
    }
}

export default FileSummary
