import { keywords } from '../../misc/Keywords'
import polyline from '@mapbox/polyline'

export const parseFileData = fileData => {
    if(fileData === "" || fileData === null || fileData === undefined) throw new Error("Uploaded file has no data inside.");

    var rows = fileData.split('\n');
    rows.filter(row => row !== '')
    if(rows.length === 1) throw new Error("Uploaded file consists of only column names.");
    if(rows.length > 500000) throw new Error("Uploaded file has more than 100000 rows. Please upload smaller file.");
    
    const columns = rows[0].split(",");
    var data = rows.slice(1).map(row => row.split(","));

    var polylineColumnId = columns.findIndex(column => column.toUpperCase().match(/(POLYLINE)/g));
    if(polylineColumnId === -1) polylineColumnId = null;

    var startKeywords = keywords.general.concat(keywords.startDate).join('|');
    var startRegex = new RegExp(`(?<=(^|[_\\s]))(${startKeywords})(?=($|[_\\s]))\\S+(?<=(^|[_\\s]))(${startKeywords})(?=($|[_\\s]))`, 'g');
    var startTimestampColumnId = columns.findIndex(column => column.toUpperCase().match(startRegex));
    if(startTimestampColumnId === -1) startTimestampColumnId = null;

    var endKeywords = keywords.general.concat(keywords.endDate).join('|');
    var endRegex = new RegExp(`(?<=(^|[_\\s]))(${endKeywords})(?=($|[_\\s]))\\S+(?<=(^|[_\\s]))(${endKeywords})(?=($|[_\\s]))`, 'g');
    var endTimestampColumnId = columns.findIndex(column => column.toUpperCase().match(endRegex));
    if(endTimestampColumnId === -1) endTimestampColumnId = null;

    return {columns, data, polylineColumnId, startTimestampColumnId, endTimestampColumnId};
}

export const generateFeatureCollection = (data, columns, polylineColumnId, startTimestampColumnId, endTimestampColumnId, includePathAnimation) => {
    var exportObject = {
        type: "FeatureCollection",
        features: []
      }
  
      for(let row of data) {
        let feature = {
          type: "Feature",
          properties: Object.assign(...columns.map((column, i) => ({[column]: row[i]}))),
          geometry: {
            type: "LineString",
            coordinates: []
          }
        }
  
        let coordinates = polyline.decode(row[polylineColumnId]);
  
        if(includePathAnimation && startTimestampColumnId && endTimestampColumnId) {
          let startTimestamp = Date.parse(row[startTimestampColumnId]);
          let endTimestamp = Date.parse(row[endTimestampColumnId]);
          let interval = Math.floor((endTimestamp - startTimestamp) / coordinates.length);
  
          coordinates.map((coordinate, index) => {
            coordinate.push(1);
            coordinate.push(startTimestamp + index * interval);
            return coordinate;
          });
        }
  
        feature.geometry.coordinates = coordinates;
        exportObject.features.push(feature);
      }

      return exportObject;
}