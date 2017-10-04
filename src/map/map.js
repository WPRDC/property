/**
 * Created by sds25 on 9/15/17.
 */

import React, {Component} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

/* Material UI Components*/

/* Functions */
import {getCartoTiles, getParcel} from './mapUtils'
import {BASEMAPS} from './mapDefaults'

import MapController from "./MapController"

/* Constants */
const mapDefaults = {
    position: [40.45, -79.9959],
    zoom: 16,
    maxZoom: 18
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            styleLayer: null,
            selectedShape: null,
            baseMap: <TileLayer className="basemap"
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />,
        };

        this.handleClick = this.handleClick.bind(this);
        this.updateBasemap = this.updateBasemap.bind(this);
        this.updateStyleLayer = this.updateStyleLayer.bind(this);
    }

    updateBasemap(i) {
        let basemap = BASEMAPS[i];
        this.setState({baseMap: null});
        this.setState({
            baseMap: <TileLayer className="new-basemap" url={basemap.url} attribute={basemap.attribution}/>
        });
        console.log(basemap);
        this.render();
    }


    /**
     * Runs when map is clicked.  It colors the selected parcel and then changes the parcelId for the entire map.
     * @param e
     */
    handleClick(e) {
        // Highlight the Parcel Polygon
        let sql = `SELECT pin, the_geom, the_geom_webmercator FROM allegheny_county_parcel_boundaries WHERE ST_Contains(the_geom, ST_SetSRID(ST_Point(${e.latlng.lng}, ${e.latlng.lat}), 4326))`;
        this.setState({selectedShape: null});   // Hacky fix that tricks react into rerendering the layer.  Aparently changing the `selectedShape` isn't enough.
        this.setState({
            selectedShape: <CartoLayer sql={sql}
                                       css="#layer {line-color: #00F; polygon-fill: #00F; polygon-opacity: 0.4}"/>
        });

        // Lift parcelId state up
        getParcel(e.latlng)
            .then((parcelId) => {
                this.props.updateParcel(parcelId)
            });
    }

    /**
     * Request new Carto tile layer styled with `css`
     * @param {string} sql - SQL query used to define map for style layer
     * @param {string} css - cartoCSS string used to style new layer
     */
    updateStyleLayer(sql, css) {
        console.log(sql);
        console.log(css);

        this.setState({styleLayer: <CartoLayer sql={sql} css={css}/>});
    }

    render() {
        const style = {
            base: {
                position: 'relative',
            },
            map: {
                height: '100%',
                cursor: 'pointer'
            }
        };
        return (
            <div style={style.base} className="mapContainer">
                <Map style={style.map}
                     center={mapDefaults.position}
                     zoom={mapDefaults.zoom}
                     maxZoom={mapDefaults.maxZoom}
                     onClick={this.handleClick}
                >
                    {this.state.baseMap}
                    {this.state.styleLayer}
                    {this.state.selectedShape}
                    <CartoLayer sql="SELECT * FROM allegheny_county_parcel_boundaries"
                                css={"#allegheny_county_parcel_boundaries{" +
                                "polygon-fill: #FFFFFF;" +
                                "polygon-opacity: 0.0;" +
                                "line-color: #4d4d4d;" +
                                "line-opacity: 0;" +
                                "[zoom >= 15] {line-opacity: .8; line-width: .5}" +
                                "[zoom >=17] {line-opacity: .8; line-width: 1}}"}/>
                </Map>
                <MapController updateBasemap={this.updateBasemap} updateStyleLayer={this.updateStyleLayer}
                             basemaps={BASEMAPS}/>
            </div>
        );
    }
}



/*******************************************************
 * CUSTOM MAP LAYERS
 *******************************************************/
class CartoLayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sql: this.props.sql,
            css: this.props.css,
            tiles: ''
        };
        this.setTiles = this.setTiles.bind(this);
    }

    componentDidMount() {
        this.setTiles();
    }

    componentWillUpdate(){
        this.setTiles();
    }

    /**
     * Collects tiles from Carto and loads them into component
     */
    setTiles() {
        getCartoTiles(this.state.sql, this.state.css)
            .then((tileUrl) => {
                this.setState({tiles: tileUrl})
            }, (err) => {
                console.log(err);
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sql !== this.props.sql || nextProps.css !== this.props.css) {
            this.setState({sql: nextProps.sql, css: nextProps.css})
        }
    }


    render() {
        const tiles = this.state.tiles;

        if (tiles === null)
            return null;

        return <TileLayer url={tiles}/>

    }
}
