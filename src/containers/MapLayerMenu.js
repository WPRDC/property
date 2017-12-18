import React, {Component} from 'react';
import {connect} from 'react-redux';
/* Material UI Components 0*/
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';


/* Custom Components */
import MapLayerList from './MapLayerList'
import MapStyleMenu from './MapStyleMenu'

/* Functions & Constants */

import {StyleMenuEditModes, LayerTypes} from "../utils/mapDefaults";
import {removeStyleLayer} from "../actions/styleMenuActions";
import {openCustomStyleMenu, openHighlightMenu} from "../actions";

const style = {
    base: {
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: '2',
        width: "280px",
    }
};


class MapLayerMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // UI states
            open: false,
            basemapMenuOpen: false,
            styleMenuOpen: false,
            basemapMenuAnchorEl: null,

            // Menu Controls
            styleMenuMode: '',
            layers: [],
            targetLayerIdx: 0  // The current layer that is being styled
        }
    }

    render() {
        const {
            isOpen
        } = this.props;
        return (
            <div style={style.base}>
                <Slide in={isOpen} direction="right">
                    <Paper>
                        {/* Heading */}
                        <AppBar position="static" color="primary">
                            <Toolbar>
                                <Typography type="title" color="inherit">
                                    Map Layers
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <MapLayerList/>


                        {/*Map Style Menu*/}
                        <MapStyleMenu/>


                    </Paper>
                </Slide>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {
        isOpen
    } = state.mapLayerMenu;

    return {
        isOpen
    }
}


function mapDispatchToProps(dispatch) {
    return {
        removeStyleLayer: (index) => () => {
            dispatch(removeStyleLayer(index))
        },
        openMenu: (mode, layerType, layerIndex) => () => {
            switch (layerType) {
                case LayerTypes.CUSTOM:
                    dispatch(openCustomStyleMenu(mode, layerIndex));
                    break;
                case LayerTypes.HIGHLIGHT:
                    dispatch(openHighlightMenu(mode, layerIndex,));
                    break;
                default:
                    console.log('ERROR - invalid layer type: ' + layerType)
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapLayerMenu)