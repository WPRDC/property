/**
 * Created by sds25 on 9/20/17.
 */


const PARCEL_MAP = {
    sql: "SELECT * FROM allegheny_parcel_boundaries",
    css: `#allegheny_county_parcel_boundaries{ +
            polygon-fill: #FFFFFF; +
            polygon-opacity: 0.2;+
            line-color: #4d4d4d; +
            line-width: 0.5;+ 
            line-opacity: 0; +
            [zoom >= 15] {line-opacity: .8;}}`
};


export const BASEMAPS = {
    osm: {
        name: 'OpenStreetMap',
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        avatar: 'osm.png'
    },
    positron: {
        name: 'Carto Positron',
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        avatar: 'osm.png'
    },
    positronDark: {
        name: 'Carto Positron Dark',
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        avatar: 'osm.png'
    },
    esri: {
        name: 'Esri World Street Map',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        avatar: 'osm.png'
    }
}

export const STYLE_DATASETS = {
    assessment: {
        name: "Property Asssessment",
        mapId: "",
        fields: {
            'stuff': {
                'id': 'stuff',
                'name': 'Stuff'
            },
            'things': {
                'id': 'things',
                'name': 'Things'
            },
        }
    },
    sales: {
        name: "Property Sales",
        mapId: "",
        fields: {
            'salesstuff': {
                'id': '',
                'name': 'Stuff'
            },
            'salesthings': {
                'id': 'salesthings',
                'name': 'Things'
            },
        }
    }
}
