import React, {Component} from 'react';
import {connect} from 'react-redux';
/* Material UI Components 0*/
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import List, {ListItem, ListItemIcon, ListItemText, ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Slide from 'material-ui/transitions/Slide';

import LayersIcon from 'material-ui-icons/Layers';

/* Custom Components */
import LayerListItem from '../components/map/LayerListItem'
import AddLayerListItem from '../components/map/AddLayerListItem'
import BaseMapMenu from '../components/map/BaseMapMenu'
import MapStyleMenu from '../components/map/MapStyleMenu'

/* Functions & Constants */
import {COLORS} from "../utils/dataUtils";

import {green} from 'material-ui/colors';

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

    /**
     * Closes basemap menu. Used as call back for onRequestClose events.
     */
    handleRequestClose = name => () => {
        this.setState({[name]: false});
    };


    /**
     * Opens or closes the basemap menu.
     * @param {event} event - click event that triggered this as a callback
     */
    toggleBasemapMenu = event => {
        this.setState(
            {
                basemapMenuOpen: !this.state.basemapMenuOpen,
                basemapMenuAnchorEl: event.currentTarget    // menu DOM element that was clicked
            }
        );
    };

    /**
     * Brings up new layer dialog.
     * Runs when add new layer button is clicked.
     */
    handleAddLayer = () => {
        const {openMenu} = this.props;

    };


    render() {
        const {
            styleLayers,
            styleLayerListMenu,
            removeStyleLayer,
            openMenu
        } = this.props;

        const {isOpen} = styleLayerListMenu;

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

                        {/* Layer List */}
                        <List>
                            {styleLayers.reverse().map(({layerType, menuState, styleInfo}, i) =>
                                <LayerListItem key={i.toString()}
                                               layer={menuState}
                                               handleUpdate={openMenu(StyleMenuEditModes.UPDATE, layerType, i)}
                                               handleDelete={removeStyleLayer(i)}
                                />
                            )}

                            <AddLayerListItem
                                handleOnClick={openMenu(StyleMenuEditModes.ADD, LayerTypes.CUSTOM, styleLayers.length)}/>

                            <Divider inset/>
                            <ListItem button={true} onClick={this.toggleBasemapMenu}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LayersIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={"Basemap Layer"} secondary={this.state.basemapName}/>

                                <BaseMapMenu open={this.state.basemapMenuOpen}
                                             anchorEl={this.state.basemapMenuAnchorEl}
                                             handleRequestClose={this.handleRequestClose('basemapMenuOpen')}
                                />
                            </ListItem>
                        </List>

                        {/*Map Style Menu*/}
                        <MapStyleMenu open={this.state.styleMenuOpen}
                                      savedState={this.state.layers[this.state.targetLayerIdx]}
                                      layerIndex={this.state.targetLayerIndex}
                                      mode={this.state.styleMenuMode}
                                      handleRequestClose={this.handleRequestClose('styleMenuOpen')}
                        />


                    </Paper>
                </Slide>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {
        styleLayers,
        styleLayerListMenu,
    } = state;

    return {
        styleLayers,
        styleLayerListMenu
    }
}


function mapDispatchToProps(dispatch) {
    return {
        removeStyleLayer: (index) => () => {
            dispatch(removeStyleLayer(index))
        },
        openMenu: (mode, layerType, layerIndex) => () => {
            switch (layerType) {
                case 'CUSTOM':
                    dispatch(openCustomStyleMenu(mode, layerIndex));
                    break;
                case 'HIGHLIGHT':
                    dispatch(openHighlightMenu(mode, layerIndex));
                    break;
                default:
                    console.log('ERROR - invalid layer type: ' + layerType)

            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapLayerMenu)