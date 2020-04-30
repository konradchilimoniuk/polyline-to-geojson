import React, { Component } from 'react'

export class FileExport extends Component {
    render() {
        return (
            <div className="section">
                <h2>Export File</h2>
                <div className="section">
                    <div className="section-content">
                        Set filename and click generate to download GeoJSON file.
                        <div className="section-option">
                            <label htmlFor="fileName">Filename</label>
                            <input id="fileName" name="fileName" type="text" value={this.props.fileName} onChange={e => this.props.handleFileNameChange(e.target.value)} />
                            <button className="inline" onClick={this.props.generateGeoJSON}>Generate GeoJSON</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileExport
