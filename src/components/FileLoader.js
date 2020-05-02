import React from 'react'
import ErrorNotification from './ErrorNotification';
import { v4 as uuid } from 'uuid'
import DragArea from './objects/DragArea';
import worker from 'workerize-loader!./worker/FileDataWorker' // eslint-disable-line import/no-webpack-loader-syntax

class FileLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inDragArea: false,
            errors: []
        }
    
        this.dragDepth = 0;
    
        this.dragProps = {
            onDragEnter: this.handleDragEnter,
            onDragLeave: this.handleDragLeave,
            onDragOver: this.handleDragOver,
            onDrop: this.handleDrop
        }
    }

    handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragDepth++;
        
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({inDragArea: true});
        }
    }

    handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragDepth--;
        if(this.dragDepth > 0) return;
        
        this.setState({inDragArea: false});
    }

    handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        
    }

    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({inDragArea: false});
        
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            if(e.dataTransfer.items.length > 1)
                this.showError("Dragged too many files.")
            else
                this.handleFile(e.dataTransfer.files[0]);

            e.dataTransfer.clearData();
            this.dragDepth = 0;
        }
    }

    handleFile = file => {
        if(file !== null && file !== undefined) {
            if(file.type !== "text/csv") return this.showError("Uploaded file is not a CSV file.")

            this.props.handleIsFileLoading(true);
            var reader = new FileReader();
            var fileDataWorker = worker();

            reader.onload = e => {
                fileDataWorker.parseFileData(e.target.result)
                    .then(result => {
                        this.props.handleFileUpload(result)
                    })
                    .catch(error => {
                        this.showError(error.message);
                        this.props.handleIsFileLoading(false);
                    })
            }

            reader.readAsText(file);
        }
    }

    showError = message => {
        const errors = this.state.errors;
        this.setState({ errors : [...errors, {
            id: uuid(),
            message
        }] })
    }

    removeError = id => {
        const errors = this.state.errors.filter(error => error.id !== id);
        this.setState({ errors : [...errors] })
    }

    render() {
        return (
            <div id="file-loader">
                <DragArea dragProps={this.dragProps} inDragArea={this.state.inDragArea} handleFile={this.handleFile} />
                <div className="error-group">
                    {this.state.errors.map(error => <ErrorNotification key={error.id} message={error.message} index={error.id} removeError={this.removeError} />)}
                </div>
            </div>
        )
    }
}

export default FileLoader;