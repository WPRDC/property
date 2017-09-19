/**
 * Created by sds25 on 9/19/17.
 */
/**
 * Created by SDS25 on 3/3/2017.
 */

import {cartoMaps, baseMaps} from './defaults'

import {LayerList, Layers} from './Layers'

// Carto SQL engine
const cartoSQL = new cartodb.SQL({user: 'wprdc'});

/*

 * ============================================================================
 * | MAP INITIALIZATION |
 * ============================================================================
 */


// Instantiate LayerList
const layers = new LayerList(map);

// Main parcel layer for selection and so on
const parcelLayer = new Layer(map, "base_parcel", "Parcels", "MultiPolygon", cartoMaps.parcel.id, cartoMaps.parcel.defaultOptions);


layers.add(parcelLayer);


//Define extra layer on which to apply selection highlights
const selectedLayer = L.geoJson().addTo(map);



// When a parcel is clicked, highlight it
function processParcel(e, latlng, pos, data, layer, pan) {
    console.log("THE DATA", data);
    selectedLayer.clearLayers();
    cartoSQL.execute("SELECT the_geom FROM allegheny_county_parcel_boundaries WHERE pin = '{{id}}'",
        {
            id: data.pin
        },
        {
            format: 'geoJSON'
        }
    ).done(function (data) {
        selectedLayer.addData(data);

    });
    if (pan) {

    }
    displayParcelData(data.pin, pan)
}

