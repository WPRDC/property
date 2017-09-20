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

    console.log(options);

    return new Promise((resolve, reject) => {

        fetch(url, options).then((response) => {
            if (response.ok) {
                // cache response before resolving
                response.json()
                    .then((data) => {
                        let templateUrl = 'https://wprdc.carto.com/api/v1/map/' + data.layergroupid + '/{z}/{x}/{y}.png'
                        console.log(templateUrl);
                        resolve(templateUrl);
                    }, (err) => {
                        reject(err);
                    })

            }
            else {
                console.log(response.status);
            }
        });
    });
}

export function getParcel(latlng) {
    const url = "https://wprdc.carto.com/api/v2/sql/?";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let params = {
        q: `SELECT pin, the_geom FROM allegheny_county_parcel_boundaries WHERE ST_Contains(the_geom, ST_SetSRID(ST_Point(${latlng.lng}, ${latlng.lat}), 4326))`,
        format: 'GeoJSON',
    };

    console.log(params.q);
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');


    return new Promise((resolve, reject) => {
        fetch(url + query).then((response) => {
            if (response.ok) {
                response.json()
                    .then((data) => {
                        resolve(data)
                    }, (err) => {
                        reject(err)
                    })
            } else {
                reject(response.status)
            }
        })
    })


}