/**
 * Created by sds25 on 9/19/17.
 */

export const cartoMaps = {
    parcel: {
        "id": "75f76f2a-5e3a-11e6-bd76-0e3ff518bd15",
        "type": "Multipolygon",
        "defaultTitle": "Parcels",
        "defaultOptions": {
            locked: true,
            main_sublayer: 0,
            legends: false,
            css: "#allegheny_county_parcel_boundaries{" +
            "polygon-fill: #FFFFFF;" +
            "polygon-opacity: 0.2;" +
            "line-color: #4d4d4d;" +
            "line-width: 0.5;" +
            "line-opacity: 0;" +
            "[zoom >= 15] {line-opacity: .8;}}",
            interactivity: 'cartodb_id, address, pin',
            featureClick: processParcel
        }
    },

    // Region boundaries
    pgh_hoods: {
        "id": "5c486850-1c99-11e6-ac7e-0ecd1babdde5",
        "type": "Multipolygon",
        "defaultTitle": "Pittsburgh Neighborhoods",
        "defaultOptions": {
            'css': "#layer{polygon-fill: #FFFFFF; polygon-opacity: 0; line-width: 3; [zoom <13]{line-width: 2} line-color: #000000; line-opacity: 0.8;}",
            'interaction': false
        }
    },
    municipalities: {
        "id": "af19fee2-234f-11e6-b598-0e3ff518bd15",
        "type": "Multipolygon",
        "defaultTitle": "Allegheny County Municipalities",
        "defaultOptions": {
            'css': "#layer{polygon-fill: #FFFFFF; polygon-opacity: 0; line-width: 3; [zoom <13]{line-width: 2} line-color: #000000; line-opacity: 0.8;}",
            'interaction': false
        }
    },

    // Parcel Styling Layers
    liens: {
        "id": "724f2146-08d1-11e7-9e54-0e3ebc282e83",
        "type": "Multipolygon",
        "defaultTitle": "Allegheny County Tax Liens",
        "defaultOptions": {
            'css': "#layer {" +
            "  line-width: 0;" +
            "  line-color: #FFF;" +
            "  line-opacity: 0.5;" +
            "}" +
            "#layer[total_amount<=1000] {" +
            "  polygon-fill: #a7a500;" +
            "  polygon-opacity: 1.0;" +
            "}" +
            "#layer[total_amount>1000][total_amount<=10000] {" +
            "  polygon-fill: #ffa900;" +
            "  polygon-opacity: 1.0;" +
            "}" +
            "#layer[total_amount>10000][total_amount<=100000] {" +
            "  polygon-fill: #ff0000;" +
            "  polygon-opacity: 1.0;" +
            "}" +
            "#layer[total_amount>100000] {" +
            "  polygon-fill: #000;" +
            "  polygon-opacity: 1.0;" +
            "}",
            'interaction': false
        },
    },
    sales: {
        "id": "5b2d4b7c-003a-11e7-b36e-0ee66e2c9693",
        "type": "Multipolygon",
        "defaultTitle": "Allegheny County Real Estate Sales",
        "defaultOptions": {'interaction': false}
    },
    homestead: {
        "id": "0642c99a-1483-11e7-b428-0e3ff518bd15",
        "type": "Multipolygon",
        "defaultTitle": "Allegheny County Real Estate Sales",
        "defaultOptions": {'interaction': false}
    },

    // Point Layers
    trees: {
        "id": "5333373d-d413-4459-93b7-e93186c799f4",
        "type": "Point",
        "defaultTitle": "City Owned Trees",
        "defaultOptions": {'interaction': false}
    },
    intersections: {
        "id": "899611da-ff11-11e6-9875-0e3ff518bd15",
        "type": "Point",
        "defaultTitle": "Signalized Intersections",
        "defaultOptions": {'interaction': false}
    },
    water_features: {
        "id": "8238b908-ff0f-11e6-af2d-0e3ebc282e83",
        "type": "Point",
        "defaultTitle": "City Water Features",
        "defaultOptions": {'interaction': false}
    },
    pat_stops: {
        "id": "3e27bdae-ae88-11e6-8268-0e3ebc282e83",
        "type": "Point",
        "defaultTitle": "Port Authority Transit Stops",
        "defaultOptions": {'interaction': false}
    }
};


export const basemaps = {
    openStreetMap: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    openMapSurfer: L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    positron: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }),
    stamenToner: L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    }),
    stamenWatercolor: L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    })
};


