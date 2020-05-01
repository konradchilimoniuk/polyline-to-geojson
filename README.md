# Polyline To GeoJSON Decoder

Polyline To GeoJSON Decoder is an app created in React that takes your CSV file containing Polylines and convertes them into Feature Collection using [@mapbox](https://github.com/mapbox) library. Additionally, path animation can be included, if your file has start and end timestamps. All calculations are done on the client side. No data is uploaded on server.

## Usage

1. Upload CSV file containing Polylines. _Optionally, your file can contain start and date timestamps._
2. Check if correct columns have been set. _Optionally, include path animation by clicking on checkbox._
3. Edit data if necessary.
4. Set new filename and click _Generate GeoJSON_.

## Additional Information

Pagination was created using [this tutorial on Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react).
