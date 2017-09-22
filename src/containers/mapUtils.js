/**
 * Created by sds25 on 9/20/17.
 */

import cartodb from 'cartodb'

const cartoSQL = cartodb.SQL({user: 'wprdc'});

export function getCartoTiles(sql, css) {
    let url = 'https://wprdc.carto.com/api/v1/map/';

    if (typeof(sql) === 'undefined') {
        throw new TypeError('missing SQL')
    }

    if (typeof(css) === 'undefined') {
        css = '#layer { polygon-fill: #FFF; polygon-opacity: 0.2; line-color: #000; line-opacity: 1;}'
    }

    let mapconfig = {
        "version": "1.3.1",
        "layers": [{
            "type": "cartodb",
            "options": {
                "cartocss_version": "2.1.1",
                "cartocss": css,
                "sql": sql
            }
        }]
    };

    let headers = new Headers();
    headers.append("Content-Type", "application/json");


    let options = {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(mapconfig),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        dataType: 'json'
    }

    return new Promise((resolve, reject) => {

        fetch(url, options).then((response) => {
            if (response.ok) {
                // cache response before resolving
                response.json()
                    .then((data) => {
                        let templateUrl = 'https://wprdc.carto.com/api/v1/map/' + data.layergroupid + '/{z}/{x}/{y}.png'
                        resolve(templateUrl);
                    }, (err) => {
                        reject(err);
                    })

            }
            else {
                reject(response.status)
            }
        });
    });
}


/**
 * Finds parcel at latlng.
 * This currently uses Carto's SQL API to find what parcel contains the point that was clicked.
 * TODO: decouple from carto, and allow different functions to be used in it's place depending developer's stack.
 *
 * @param {object} latlng - object containing `lat` and `lng` properties representing latitude and longitude.
 *                          The point should use the WGS84 projection (SRID: 4326)
 * @return {Promise} - resolves with parcel id string, rejects with error message
 */
export function getParcel(latlng) {
    let url = 'https://wprdc.carto.com/api/v2/sql?q=';
    let sql = `SELECT pin FROM allegheny_county_parcel_boundaries WHERE ST_Contains(the_geom, ST_SetSRID(ST_Point(${latlng.lng}, ${latlng.lat}), 4326))`;

    return new Promise((resolve, reject) => {
        fetch(url + sql).then((response) => {
            if (response.ok) {
                response.json()
                    .then((data) => {
                        // Check that a parcel was found.
                        if (data.rows.length)
                            resolve(data.rows[0].pin);  // pin is short for Parcel ID Number
                        else
                            reject("Query successful, but no parcel found.")
                    }, (err) => {
                        reject(err)
                    })
            }
            else {
                reject(response.status)
            }
        })
    })
}