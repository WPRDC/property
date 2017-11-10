import React, {Component} from 'react';
import PropTypes from 'prop-types'


import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import {fetchParcelFromPoint} from "../actions/";
import CartoMapLayer from "../components/map/CartoMapLayer";
import MapLayerMenu from "../map/MapLayerMenu"
import {connect} from 'react-redux'

import {BASEMAPS} from "../map/mapDefaults";


const style = {
    base: {
        position: 'relative',
    },
    map: {
        height: '100%',
        cursor: 'pointer'
    }
};

class InterfaceMap extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Runs when map is clicked.  It colors the selected parcel and then changes the parcelId for the entire map.
     * @param event
     */
    handleClick = event => {
        const {handleParcelClick} = this.props;
        const {latlng} = event;

        handleParcelClick(latlng)
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

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.parcelId !== this.props.parcelId) {
            this.render();
        }
        console.log("w000000000000000t");
        this.render();

    }


    render() {
        const {basemapLayer, availableRegionsLayer, selectedLayer, styleLayers} = this.props;
        //const {viewport, maxZoom} = mapOptions;
        console.log(basemapLayer);
        return (
            <div style={style.base} className="mapContainer">

                <Map style={style.map}
                     onClick={this.handleClick}
                     zoomControl={false}
                >
                    <ZoomControl position='topright'/>

                    <TileLayer className="the-thing-basemap" url={basemapLayer.url}
                               attribute={basemapLayer.attribution}/>

                    {/*{styleLayers.map((styleLayer, id) =>*/}
                        {/*<CartoMapLayer sql={styleLayer.sql}*/}
                                       {/*css={styleLayer.css}*/}
                        {/*/>*/}
                    {/*)}*/}

                    {/*{selectedLayer ?*/}
                        {/*<CartoMapLayer sql={selectedLayer.sql} css={selectedLayer.css}/> :*/}
                        {/*null*/}
                    {/*}*/}

                    {/*{availableRegionsLayer}*/}

                </Map>

                <MapLayerMenu
                    updateBasemap={this.updateBasemap}
                    updateStyleLayers={this.updateStyleLayers}
                    basemaps={BASEMAPS}
                />

            </div>
        );
    }
}

InterfaceMap.propTypes = {
    basemapLayer: PropTypes.object,
    selectionLayer: PropTypes.object,
    availableRegionsLayer: PropTypes.object,
    styleLayers: PropTypes.arrayOf(PropTypes.object),
};


function mapStateToProps(state) {
    const {
        basemapLayer,
        // availableShapesLayer,
        // selectedLayer,
        // styleLayers,
        // mapOptions
    } = state;

    return {
        basemapLayer,
        // availableShapesLayer,
        // selectedLayer,
        // styleLayers,
        // mapOptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleParcelClick: latLng => {
            dispatch(fetchParcelFromPoint(latLng))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceMap)