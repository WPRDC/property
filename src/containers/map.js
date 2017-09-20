/**
 * Created by sds25 on 9/15/17.
 */

import React, {Component} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

import {getCartoTiles, getParcel} from './mapUtils'


const mapDefaults = {
    position: [40.45, -79.9959],
    zoom: 16,
    maxZoom: 18
};


export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedShape: null,
            baseMap: <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        };

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e) {
        let sql = `SELECT pin, the_geom, the_geom_webmercator FROM allegheny_county_parcel_boundaries WHERE ST_Contains(the_geom, ST_SetSRID(ST_Point(${e.latlng.lng}, ${e.latlng.lat}), 4326))`
        this.setState({selectedShape: null});
        this.setState({selectedShape: <CartoLayer sql={sql} css="#layer {line-color: #00F}"/>})
    }


    render() {
        const style = {
            height: '100%'
        };
        return (
            <div className="mapContainer">
                <Map style={style}
                     center={mapDefaults.position}
                     zoom={mapDefaults.zoom}
                     maxZoom={mapDefaults.maxZoom}
                     onClick={this.handleClick}
                >
                    {this.state.baseMap}
                    {this.state.selectedShape}
                    <CartoLayer sql="SELECT * FROM allegheny_county_parcel_boundaries"
                                css={"#allegheny_county_parcel_boundaries{" +
                                "polygon-fill: #FFFFFF;" +
                                "polygon-opacity: 0.2;" +
                                "line-color: #4d4d4d;" +
                                "line-width: 0.5;" +
                                "line-opacity: 0;" +
                                "[zoom >= 15] {line-opacity: .8;}}"}/>
                </Map>

            </div>
        );
    }
}

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

    setTiles() {
        getCartoTiles(this.state.sql, this.state.css)
            .then((tileUrl) => {
                console.log(tileUrl);
                this.setState({tiles: tileUrl})
            }, (err) => {
                console.log(err);
            })
    }


    render() {
        const tiles = this.state.tiles;

        if (tiles === null)
            return null

        return <TileLayer url={tiles}/>

    }
}