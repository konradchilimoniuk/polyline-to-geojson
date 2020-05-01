import React, { Component } from 'react'

export class FileSummary extends Component {
    render() {
        return (
            <div className="section">
                <h2 className="success">File uploaded successfully!</h2>
                <div className="section-content">
                    Found <span style={{fontWeight: "bold"}}>{this.props.dataLength}</span> rows and <span style={{fontWeight: "bold"}}>{this.props.columnsLength}</span> columns in uploaded file.
                </div>
            </div>
        )
    }
}

export default FileSummary
