/**
 * Created by sds25 on 9/15/17.
 */

import React, {Component} from 'react';
import {Map, TileLayer, GeoJSON, ZoomControl} from 'react-leaflet';

/* Material UI Components*/

/* Functions */
import {getCartoTiles, getParcel} from './mapUtils'
import {BASEMAPS} from './mapDefaults'

import MapLayerMenu from "./MapLayerMenu";
import MapController from "./MapController";

/* Constants */
const mapDefaults = {
    position: [40.438340, -79.961884],
    zoom: 16,
    maxZoom: 18
};


const DEFAULT_BASEMAP = BASEMAPS['voyager'];

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {center: mapDefaults.position, zoom: mapDefaults.zoom},
            styleLayers: [],
            selectedShape: null,
            baseMap: <TileLayer className="new-basemap" url={DEFAULT_BASEMAP.url}
                                attribute={DEFAULT_BASEMAP.attribution}/>,

        };
    }

    updateBasemap = (basemapId) => {
        let basemap = BASEMAPS[basemapId];
        this.setState({baseMap: null});
        this.setState({
            baseMap: <TileLayer className="new-basemap" url={basemap.url} attribute={basemap.attribution}/>
        });
    };


    /**
     * Runs when map is clicked.  It colors the selected parcel and then changes the parcelId for the entire map.
     * @param event
     */
    handleClick = (event) => {
        // Highlight the Parcel Polygon
        let sql = `SELECT pin, the_geom, the_geom_webmercator FROM allegheny_county_parcel_boundaries WHERE ST_Contains(the_geom, ST_SetSRID(ST_Point(${event.latlng.lng}, ${event.latlng.lat}), 4326))`;
        this.setState({selectedShape: null});   // Hacky fix that tricks react into rerendering the layer.  Aparently changing the `selectedShape` isn't enough.
        this.setState(
            {
                selectedShape: <CartoLayer sql={sql}
                                           css="#layer {line-color: #00F; polygon-fill: #00F; polygon-opacity: 0.4}"/>
            }
        );

        // Lift parcelId state up
        getParcel(event.latlng)
            .then((parcelId) => {
                this.props.updateParcel(parcelId, 'click')
            });
    };

    _selectParcel = (parcelId) => {
        let sql = `SELECT pin, the_geom, the_geom_webmercator FROM allegheny_county_parcel_boundaries WHERE pin = '${parcelId}'`;
        this.setState({
                selectedShape: <CartoLayer sql={sql}
                                           css="#layer {line-color: #00F; polygon-fill: #00F; polygon-opacity: 0.4}"/>
            },
        );
    };


    panToPoint = (lng, lat, zoom) => {
        console.log('pannin\' it up, son!', lat, lng, zoom);
        if (typeof(zoom) === 'undefined') {
            zoom = this.state.viewport.zoom;
        }
        this.setState({viewport: {center: [lat, lng], zoom: zoom}}, () => {
            console.log(this.state)
        })
    }


    /**
     * Update list of style layers
     * @param {{sql, css}[]} newStyleLayers - array of objects containing sql and css for styling maps
     */
    updateStyleLayers = (newStyleLayers) => {
        this.setState({styleLayers: newStyleLayers});
    };


    componentWillReceiveProps = nextProps => {
        console.log(nextProps);

        if(nextProps.changeMapZoom){
            this._selectParcel(nextProps.parcelId)
            this.panToPoint(nextProps.center[0], nextProps.center[1])
        }
    };

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
                     viewport={this.state.viewport}
                     maxZoom={mapDefaults.maxZoom}
                     onClick={this.handleClick}
                     zoomControl={false}
                >
                    <ZoomControl position='topright'/>
                    {this.state.baseMap}
                    {this.state.styleLayers.map((styleLayer, id) =>
                        <CartoLayer sql={styleLayer.sql}
                                    css={styleLayer.css}
                        />
                    )}
                    {this.state.selectedShape}
                    <CartoLayer sql="SELECT * FROM allegheny_county_parcel_boundaries"
                                css={"#allegheny_county_parcel_boundaries{" +
                                "polygon-fill: #FFFFFF;" +
                                "polygon-opacity: 0.0;" +
                                "line-color: #4d4d4d;" +
                                "line-opacity: 0;" +
                                "[zoom >= 15] {line-opacity: .8; line-width: .5}" +
                                "[zoom >=17] {line-opacity: .8; line-width: 1}}"}
                    />
                </Map>
                <MapLayerMenu updateBasemap={this.updateBasemap} updateStyleLayers={this.updateStyleLayers}
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
            this.setState({sql: nextProps.sql, css: nextProps.css}, this.setTiles)
        }
    }


    render() {
        const tiles = this.state.tiles;

        if (tiles === null)
            return null;

        return <TileLayer url={tiles}/>

    }
}
