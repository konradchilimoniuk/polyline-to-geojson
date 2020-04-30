import React, { Component } from 'react'

export class ReuploadFile extends Component {
    render() {
        return (
            <div className="section">
                <h2>Want to upload another file?</h2>
                <div className="section-content">
                    Click button below to upload a new file. This will remove previously uploaded data.
                    <button onClick={() => this.props.reinitialize()}>Reupload file</button>
                </div>
            </div>
        )
    }
}

export default ReuploadFile
