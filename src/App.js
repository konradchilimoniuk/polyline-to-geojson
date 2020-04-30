import React from 'react';
import FileLoader from './components/FileLoader';
import DataEditor from './components/DataEditor';
import FileExport from './components/FileExport';
import FileSummary from './components/FileSummary';
import ReuploadFile from './components/ReuploadFile';
import ColumnChooser from './components/ColumnChooser';

const initialState = {
  columns: [],
  data: [],
  polylineColumnId: null,
  startTimestampColumnId: null,
  endTimestampColumnId: null,
  includePathAnimation: false,
  isFileUploaded: false
}

class App extends React.Component {
  state = initialState;

  handleFileUpload = ({columns = [], data = [], polylineColumnId = null, startTimestampColumnId = null, endTimestampColumnId = null}) => {
    this.setState({
      columns,
      data,
      polylineColumnId,
      startTimestampColumnId,
      endTimestampColumnId,
      isFileUploaded: true
    })
  }

  handleChangeOptionValue = (property, value) => this.setState({ [property]: value})

  render() {
    return (
      <>
        <div className="app-description">
            <h1>Polyline to GeoJSON Decoder</h1>
            <p>Upload CSV file that contains Polyline values, which will be used to convert to GeoJSON coordinates. Optionally, your file can contain start timestamp and end timestamp for animating paths. Every available column will be converted into Feature properties.</p>
        </div>
        <div className="content">
          {!this.state.isFileUploaded && <FileLoader handleFileUpload={this.handleFileUpload} isFileUploaded={this.state.isFileUploaded} />}
          {this.state.isFileUploaded &&
            <>
              <FileSummary
                columnsLength={this.state.columns.length}
                dataLength={this.state.data.length}
              />
              <ColumnChooser
                columns={this.state.columns}
                polylineColumnId={this.state.polylineColumnId}
                startTimestampColumnId={this.state.startTimestampColumnId}
                endTimestampColumnId={this.state.endTimestampColumnId}
                includePathAnimation={this.state.includePathAnimation}
                handleChangeOptionValue={this.handleChangeOptionValue}
              />
              <DataEditor />
              <FileExport />
              <ReuploadFile reinitialize={() => this.setState(initialState)} />
            </>
          }
        </div>
      </>
    );
  }
}

export default App;
