/**
 * Created by sds25 on 9/15/17.
 */

import React, {Component} from 'react';
import {Map, TileLayer} from 'react-leaflet';

//import cartodb from '../vendor/cartodb'

//import {LayerList, Layers} from '../map/Layers'

// Carto SQL engine
//const cartoSQL = new cartodb.SQL({user: 'wprdc'});


// // Instantiate LayerList
// const layers = new LayerList(map);
//
// // Main parcel layer for selection and so on
// const parcelLayer = new Layer(map, "base_parcel", "Parcels", "MultiPolygon", cartoMaps.parcel.id, cartoMaps.parcel.defaultOptions);
//
//
// layers.add(parcelLayer);


const mapDefaults = {
    position: [40.45, -79.9959],
    zoom: 13,
    maxZoom: 18
}


export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            baseMap:     <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        }
    }

    componentDidMount(){
        this.setState()
    }


    render() {
        const style={
            height: '100%'
        };


        return (
            <div className="mapContainer">
                <Map style={style} center={mapDefaults.position} zoom={mapDefaults.zoom} maxZoom={mapDefaults.maxZoom}>
                    {this.state.baseMap}
                </Map>

            </div>
        );
    }
}


