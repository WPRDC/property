import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Map, TileLayer, ZoomControl} from 'react-leaflet';


/* Material UI components */
import Button from 'material-ui/Button'

/* Material UI Icons */
import LayersIcon from 'material-ui-icons/Layers'


import {fetchParcelFromPoint} from "../actions/";
import CartoMapLayer from "../components/map/CartoMapLayer";
import MapLayerMenu from "./MapLayerMenu"
import {connect} from 'react-redux'


import {BASEMAPS} from "../utils/mapDefaults";


const style = {
    base: {
        position: 'relative',
    },
    map: {
        height: '100%',
        cursor: 'pointer'
    },
    button: {
        position: 'absolute',
        top: '12px',
        right: '52px',
        zIndex: '1001',
    },
};

class InterfaceMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            layerMenuOpen: false
        }
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

    toggleLayerMenu = () => {
        this.setState({layerMenuOpen: !this.state.layerMenuOpen})
    }

    render() {
        const {mapOptions, basemapLayer, availableShapesLayer, selectedLayer, styleLayers} = this.props;
        const {center, maxZoom} = mapOptions;

        return (
            <div style={style.base} className="mapContainer">
                <Button fab color="primary" aria-label="add" onClick={this.toggleLayerMenu}
                        style={style.button}>
                    <LayersIcon/>
                </Button>


                <MapLayerMenu open={this.state.layerMenuOpen}/>

                <Map style={style.map}
                     center={center}
                     zoom={15}
                     onClick={this.handleClick}
                     zoomControl={false}
                >
                    <ZoomControl position='topright'/>

                    <TileLayer className="the-thing-basemap" url={basemapLayer.url}
                               attribute={basemapLayer.attribution}/>

                    {styleLayers.map((styleLayer, idx) =>
                        <CartoMapLayer key={idx.toString()} sql={styleLayer.styleInfo.sql}
                                       css={styleLayer.styleInfo.css}
                        />
                    )}

                    {selectedLayer
                        ? <CartoMapLayer sql={selectedLayer.sql} css={selectedLayer.css}/>
                        : null
                    }
                    {availableShapesLayer
                        ? <CartoMapLayer sql={availableShapesLayer.sql}
                                         css={availableShapesLayer.css}/>
                        : null
                    }

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
        availableShapesLayer,
        selectedLayer,
        styleLayers,
        mapOptions
    } = state;

    return {
        basemapLayer,
        availableShapesLayer,
        selectedLayer,
        styleLayers,
        mapOptions
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