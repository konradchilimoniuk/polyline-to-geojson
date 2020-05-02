import React, { Component } from 'react'

export class DragArea extends Component {
    render() {
        return (
            <div id="drop-area" {...this.props.dragProps} className={this.props.inDragArea ? "active" : ""}>
                <input id="file-chooser-input" type="file" accept=".csv" onChange={e => this.props.handleFile(e.target.files[0])} />
                <label className="drag-area-button" htmlFor="file-chooser-input">
                    Drag your file here or click here to choose it from the list.
                </label>
                <div id="drag-area-overlay" className={this.props.inDragArea ? "active" : ""}>
                    <div className="drag-area-overlay-text">
                        Drop your file here.
                    </div>
                </div>
            </div>
        )
    }
}

export default DragArea
