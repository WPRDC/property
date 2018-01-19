# Add a New Datasource

Currently, datasources are shared between CKAN for quick data access and Carto for geo requests.  
The single source of truth is CKAN from which the data one Carto is pulled.
Once the CKAN datastore is spatially indexed, all data will be requested from CKAN.

## Processes

### Connect CKAN data to carto
1. Select "New Map"
2. Select "Connect Dataset"
3. Copy url to chosen ckan resource csv file in teh URL textbox and submit.
4. Select appropriate sync frequency.
5. Join dataset to parcel boundary map.  (see example snippet below)

### Add to Property Dashboard
1. Add ckan and carto metadata to `MAP_DATASETS` in `utils/mapDefaults.js`.
```js
export const MAP_DATASETS = [
    {
        id: 'assessment',                   // id used to identify this dataset in the app
        name: 'Assessment',             // human readable name for displaying dataset in map
        datasetUrl: 'https://data.wprdc.org/dataset/property-assessments',   // ckan url to dataset
        parcelIdField: 'parid',         // name of field used for parcel id (e.g. pin, parid, parcel_id)
        cartoConnection: {              // carto map metadata
            account: 'wprdc',           // carto account in which map is stored
            table: 'assessments',       // id of dataset table in carto (not the map name)
            mapId: '4156fe54-fddc-43e6-993a-6ad37626e9e0',  // id of map in carto 
            cartoCssId: 'assessments',  // css id name used in cartocss (carto defaults to dataset id
        },
        fields: [                       // metadata describing available fields in dataset (only list the ones you want in the app)
            {
                id: 'fairmarkettotal',  // id of field (must be same in ckan and carto)
                name: 'Total Assessed Value (Fair Market)',     // human-readable display name for field
                info: '',               // extra notes to display with field (not used yet)
                type: 'numeric',        // data type (defines which map methods can be used on it, and other display options)
                subtype: 'money',       // more detailed datatype (used for displaying in dashboard)
                range: [null, null],    // specified range (use [null, null] if not applicable or to automatically generate from the datasource)
                                        // specifying a range can be useful for data with extreme outliers -- especially if they may be due to errors
                valueFunction: 'pow',   // range-slider value function ('', 'log', or 'pow') defines behavior of range slider
                base: '.0001'           // base value for valueFunction (e.g. if pow and 2, the values changes at a arte of x^2 where x is the distance moved on slider)
            }, // ...
        ]
    }, // ...
]
```
2. Write a new customModule for the newly-added dataset in `components/dashboard/customModules'`
## Examples
### Example Parcel Boundary Join
```sql
SELECT td.cartodb_id, td.pin, td.billing_city, td.current_delq, td.prior_years,
  pb.the_geom, pb.the_geom_webmercator
FROM "wprdc-editor".ed0d1550_c300_4114_865c_82dc7c23235b as td
JOIN "wprdc".allegheny_county_parcel_boundaries as pb 
ON td.pin = pb.pin
```