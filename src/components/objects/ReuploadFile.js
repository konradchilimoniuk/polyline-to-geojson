import React, { Component } from 'react'

export class ReuploadFile extends Component {
    render() {
        return (
            <div className="reupload-file">
                <div className="desc">
                    Want to upload a new CSV file?
                </div>
                <button onClick={() => this.props.reinitialize()}>Click here</button>
            </div>
        )
    }
}

export default ReuploadFile
