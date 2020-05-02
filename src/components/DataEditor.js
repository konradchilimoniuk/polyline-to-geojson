import React, { Component } from 'react'
import Pagination from './objects/Pagination';
import CellEditor from './objects/CellEditor';

export class DataEditor extends Component {
    state = {
        currentPage: 1,
        rowsPerPage: 50,
        textFilter: '',
        sort: {
            columnId: null,
            isAscending: true
        }
    }

    sortByColumnn = (a, b) => {
        var firstValue = this.state.sort.columnId ? a[this.state.sort.columnId] : a;
        var secondValue = this.state.sort.columnId ? b[this.state.sort.columnId]: b;

        if(!isNaN(Date.parse(firstValue)) && !isNaN(Date.parse(secondValue))) {
            firstValue = Date.parse(firstValue);
            secondValue = Date.parse(secondValue);

            if(this.state.sort.isAscending) return firstValue - secondValue;
            return secondValue - firstValue;
        }

        if(!isNaN(parseFloat(firstValue)) && !isNaN(parseFloat(secondValue))) {
            firstValue = parseFloat(firstValue);
            secondValue = parseFloat(secondValue);

            if(this.state.sort.isAscending) return firstValue - secondValue;
            return secondValue - firstValue;
        }

        if(this.state.sort.isAscending) return firstValue.localeCompare(secondValue);
        return secondValue.localeCompare(firstValue);
    }

    handleSortColumn = (e, index) => {
        e.preventDefault();
        this.setState({
            sort: {
                columnId: index,
                isAscending: this.state.sort.columnId === index ? !this.state.sort.isAscending : true
            }
        });
    }

    handleCancelSortColumn = e => {
        e.preventDefault();
        this.setState({
            sort: {
                columnId: null,
                isAscending: true
            }
        });
    }

    render() {
        var data = [];
        
        if(this.state.textFilter !== '') data = this.props.data.filter(row => row.values.some(cell => cell.includes(this.state.textFilter)))
        else data = this.props.data;
        
        if(this.state.sort.columnId !== null) data.sort((a, b) => this.sortByColumnn(a.values, b.values));
        else data.sort((a, b) => this.sortByColumnn(a.index, b.index));

        const dataStart = (this.state.currentPage - 1) * this.state.rowsPerPage;
        const dataEnd = dataStart + this.state.rowsPerPage;
        const partialData = data.slice(dataStart, dataEnd);

        return (
            <div className="section">
                <h2>Data View</h2>
                <div className="data-editor">
                    <div className="filters">
                        <div className="input-icon">
                            <span className="icon search-icon"></span>
                            <input id="filterText" name="filterText" value={this.state.textFilter} onChange={e => this.setState({ textFilter: e.target.value })} placeholder="Filter table..." type="text" />
                        </div>
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="row-number">#</th>
                                    {this.props.columns.map((column,index) => {
                                        return <th
                                            key={`th-${index}`}
                                            onClick={e => this.handleSortColumn(e, index)}
                                            onContextMenu={this.handleCancelSortColumn}
                                            className={this.state.sort.columnId === index ? (this.state.sort.isAscending ? 'asc' : 'desc') : undefined}
                                        >{column} {this.state.sort.columnId === index && <span className="arrow"></span>}</th>
                                        })}
                                </tr>
                            </thead>
                            <tbody>
                                {partialData.map((row, rowIndex) => {
                                    return <tr key={`tr-${row.index}`}>
                                        <td className="row-number">{dataStart + rowIndex + 1}</td>
                                        {row.values.map((cell, cellIndex)=> <CellEditor key={`td-${cellIndex}`} value={cell} columnId={cellIndex} rowId={rowIndex} handleEditCell={this.props.handleEditCell} />)}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={this.state.currentPage}
                        totalPages={Math.ceil(data.length / this.state.rowsPerPage)}
                        rowsPerPage={this.state.rowsPerPage}
                        setPage={newPage => this.setState({ currentPage: newPage })}
                        setRowsPerPage={newRowsPerPage => this.setState({ rowsPerPage: newRowsPerPage })}
                    />
                </div>
            </div>
        )
    }
}

export default DataEditor
