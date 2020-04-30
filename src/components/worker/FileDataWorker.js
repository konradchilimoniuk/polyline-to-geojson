import { keywords } from '../../misc/Keywords'

export const parseFileData = fileData => {
    if(fileData === "" || fileData === null || fileData === undefined) {
        throw new Error("Uploaded file has no data inside.");
    }

    var rows = fileData.split('\n');
    if(rows.length === 1) {
        throw new Error("Uploaded file consists of only column names.");
    }
    
    const columns = rows[0].split(",");
    var data = [];

    for(let i = 1; i < rows.length; i++) {
        data.push(rows[i].split(","));
    }

    var polylineColumnId = columns.findIndex(column => column.toUpperCase().match(/(POLYLINE)/g));
    if(polylineColumnId === -1) polylineColumnId = null;

    var startKeywords = keywords.general.concat(keywords.startDate).join("|");
    var startRegex = new RegExp(`(?<=(^|[_\\s]))(${startKeywords})(?=($|[_\\s]))\\S+(?<=(^|[_\\s]))(${startKeywords})(?=($|[_\\s]))`, 'g');
    var startTimestampColumnId = columns.findIndex(column => column.toUpperCase().match(startRegex));
    if(startTimestampColumnId === -1) startTimestampColumnId = null;

    var endKeywords = keywords.general.concat(keywords.endDate).join("|");
    var endRegex = new RegExp(`(?<=(^|[_\\s]))(${endKeywords})(?=($|[_\\s]))\\S+(?<=(^|[_\\s]))(${endKeywords})(?=($|[_\\s]))`, 'g');
    var endTimestampColumnId = columns.findIndex(column => column.toUpperCase().match(endRegex));
    if(endTimestampColumnId === -1) endTimestampColumnId = null;

    return {columns, data, polylineColumnId, startTimestampColumnId, endTimestampColumnId};
}