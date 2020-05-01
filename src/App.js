import React from 'react';
import FileLoader from './components/FileLoader';
import DataEditor from './components/DataEditor';
import FileSummary from './components/FileSummary';
import ReuploadFile from './components/ReuploadFile';
import ColumnChooser from './components/ColumnChooser';
import FileExport from './components/FileExport';
import Loading from './components/Loading';
import worker from 'workerize-loader!./components/worker/FileDataWorker' // eslint-disable-line import/no-webpack-loader-syntax

const initialState = {
  columns: [],
  data: [],
  polylineColumnId: null,
  startTimestampColumnId: null,
  endTimestampColumnId: null,
  includePathAnimation: false,

  isFileLoading: false,
  isFileUploaded: false,
  isGenerating: false,

  fileName: 'decoded-data'
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
      isFileUploaded: true,
      isFileLoading: false
    })
  }

  handleChangeOptionValue = (property, value) => this.setState({ [property]: value})
  handleIsFileLoading = value => this.setState({ isFileLoading: value })
  handleIsGenerating = value => this.setState({ isGenerating: value })
  handleFileNameChange = value => this.setState({ fileName: value })

  generateGeoJSON = e => {
      e.preventDefault();
      this.handleIsGenerating(true);
      var fileDataWorker = worker();

      fileDataWorker.generateFeatureCollection(this.state.data, this.state.columns, this.state.polylineColumnId, this.state.startTimestampColumnId, this.state.endTimestampColumnId, this.state.includePathAnimation)
          .then(result => {
              this.saveData(result);
              this.handleIsGenerating(false);
          }).catch(error => {
              console.log(error.message);
              this.handleIsGenerating(false);
          })
  }

  saveData = object => {
      var json = JSON.stringify(object);
      var blob = new Blob([json], {type: "application/json"});
      var url  = URL.createObjectURL(blob);

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      if(!this.state.fileName) {
          console.log("File name is empty")
          return;
      }
      a.download = `${this.state.fileName}.geojson`;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  }

  render() {
    return (
      <>
        <div className="app-description">
            <h1>Polyline to GeoJSON Decoder</h1>
            <p>Upload CSV file that contains Polyline values, which will be used to convert to GeoJSON coordinates. Optionally, your file can contain start timestamp and end timestamp for animating paths. Every available column will be converted into Feature properties.</p>
        </div>
        <div className="content">
          {(!this.state.isFileLoading && !this.state.isFileUploaded && !this.state.isGenerating) &&
            <FileLoader
              handleFileUpload={this.handleFileUpload}
              handleIsFileLoading={this.handleIsFileLoading}
            />}
          {(!this.state.isFileLoading && this.state.isFileUploaded && !this.state.isGenerating) &&
            <>
              <FileSummary
                columnsLength={this.state.columns.length}
                dataLength={this.state.data.length}
              />
              <FileExport
                generateGeoJSON={this.generateGeoJSON}
                fileName={this.state.fileName}
                handleFileNameChange={this.handleFileNameChange}
              />
              <ColumnChooser
                columns={this.state.columns}
                polylineColumnId={this.state.polylineColumnId}
                startTimestampColumnId={this.state.startTimestampColumnId}
                endTimestampColumnId={this.state.endTimestampColumnId}
                includePathAnimation={this.state.includePathAnimation}
                handleChangeOptionValue={this.handleChangeOptionValue}
              />
              <DataEditor
                columns={this.state.columns}
                data={this.state.data}
              />
              <ReuploadFile reinitialize={() => this.setState(initialState)} />
            </>
          }
          {(this.state.isGenerating || this.state.isFileLoading) && <Loading />}
        </div>
      </>
    );
  }
}

export default App;
