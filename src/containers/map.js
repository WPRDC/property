/**
 * Created by sds25 on 9/15/17.
 */

import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

const mapDefaults = {
    position: [40.45, -79.9959],
    zoom: 13,
    maxZoom: 18
}


export class MapContainer extends Component {
    render() {
        const style={
            height: '100%'
        };


        return (
            <div className="mapContainer">
                <Map style={style}center={mapDefaults.position} zoom={mapDefaults.zoom} maxZoom={mapDefaults.maxZoom}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>

            </div>
        );
    }
}

