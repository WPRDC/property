import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import DataHighlightMenu from '../components/map/DataHighlightMenu'

/* Material UI components */
import Button from 'material-ui/Button'

/* Material UI Icons */
import LayersIcon from 'material-ui-icons/Layers'


import {fetchParcelFromPoint} from "../actions/";
import CartoMapLayer from "../components/map/CartoMapLayer";
import MapLayerMenu from "./MapLayerMenu"
import {connect} from 'react-redux'


import {BASEMAPS} from "../utils/mapDefaults";
import {toggleStyleLayerListMenu} from "../actions/layerEditorActions";
import {toggleMapLayerMenu} from "../actions/mapLayerActions";


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

class StyledMap extends Component {
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


    render() {
        const {
            mapOptions,
            basemap,
            availableShapesLayer,
            selectedLayer,
            mapLayerList,
            mapLayersById,
            styleLayerMenu,
            toggleStyleLayerMenu
        } = this.props;

        const {
            center,
            maxZoom
        } = mapOptions;
        return (
            <div style={style.base} className="mapContainer">
                <Button fab color="primary" aria-label="add" onClick={toggleStyleLayerMenu}
                        style={style.button}>
                    <LayersIcon/>
                </Button>


                <MapLayerMenu/>

                <Map style={style.map}
                     center={center}
                     zoom={15}
                     onClick={this.handleClick}
                     zoomControl={false}
                     tap={false}
                >
                    <ZoomControl position='topright'/>

                    <TileLayer url={basemap.url}
                               attribute={basemap.attribution}/>

                    {mapLayerList.map((layerId, layerIndex) => {
                            const currLayer = mapLayersById[layerId];
                            return (
                                <CartoMapLayer key={layerId}
                                               sql={currLayer.styleInfo.sql}
                                               css={currLayer.styleInfo.css}
                                               zIndex={100 + layerIndex}
                                />
                            )
                        }
                    )}

                    {availableShapesLayer
                        ? <CartoMapLayer sql={availableShapesLayer.sql}
                                         css={availableShapesLayer.css}
                                         zIndex={999}/>
                        : null
                    }
                    {selectedLayer
                        ? <CartoMapLayer sql={selectedLayer.sql} css={selectedLayer.css} zIndex={1000}/>
                        : null
                    }


                </Map>
                <DataHighlightMenu/>

            </div>
        );
    }
}

StyledMap.propTypes = {
    basemap: PropTypes.object,
    selectionLayer: PropTypes.object,
    availableRegionsLayer: PropTypes.object,
    mapLayerList: PropTypes.arrayOf(PropTypes.string),
};


function mapStateToProps(state) {
    const {
        basemap,
        availableShapesLayer,
        selectedLayer,
        mapLayerList,
        mapLayersById,
        mapOptions,
        styleLayerMenu
    } = state;

    return {
        basemap: basemap.selectedBasemap,
        availableShapesLayer,
        selectedLayer,
        mapLayerList,
        mapLayersById,
        mapOptions,
        styleLayerMenu
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleParcelClick: latLng => {
            dispatch(fetchParcelFromPoint(latLng))
        },
        toggleStyleLayerMenu: () => {
            dispatch(toggleMapLayerMenu())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StyledMap)