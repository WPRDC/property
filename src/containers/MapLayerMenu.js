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

/* Icons */
import LayersIcon from 'material-ui-icons/Layers';

/* Custom Components */
import LayerListItem from '../components/map/LayerListItem'
import AddLayerListItem from '../components/map/AddLayerListItem'
import BaseMapMenu from '../components/map/BaseMapMenu'
import MapStyleMenu from '../components/map/MapStyleMenu'

/* Functions & Constants */
import {COLORS} from "../utils/dataUtils";

import {green} from 'material-ui/colors';

import {STYLE_MENU_MODES} from "../utils/mapDefaults";
import {removeStyleLayer} from "../actions/mapActions";
import {openHighlightMenu} from "../actions";

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

    toggleSlide = open => () => {
        this.setState({
            'open': open,
        });
    };


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
        console.log("adding a layer");
        this.setState(
            {
                styleMenuOpen: true,
                styleMenuMode: STYLE_MENU_MODES.ADD
            }
        )
    };

    /** Open style menu and let it know the index of the layer to style */
    handleUpdateLayer = (idx, type) => () => {
        if(type === 'HIGHLIGHT_LAYER'){
            const styleLayer = this.props.styleLayers[idx];
            const {dataset, items} = styleLayer.menuState;
            this.props.handleOpenHighlightMenu(dataset, items)
        } else {
            this.setState(
                {
                    styleMenuOpen: true,
                    styleMenuMode: STYLE_MENU_MODES.UPDATE,
                    targetLayerIndex: idx
                }
            )
        }
    };

    /**
     * Updates the style layer at index `targetIdx` with `styleLayerData`.  If `targetIdx` is out of bounds of
     * `this.state.layers` then this adds a new layer.
     * @param targetIdx
     */
    handleStyleMenuResults = targetIdx => styleLayerData => {
        let newLayers;
        // If adding a new layer
        if (targetIdx >= this.state.layers.length) {
            newLayers = this.state.layers.concat([styleLayerData]);
        }
        // When updating a pre-existing layer
        else {
            newLayers = this.state.layers.map((layer, currIdx) => {
                if (currIdx !== targetIdx)
                    return layer;
                else
                    return styleLayerData
            })
        }

        this.setState(
            {layers: newLayers},
            // Lift SQL and CSS up to InterfaceMap to render the style
            () => {
                this.updateStyleLayers()
            }
        );

    };


    render() {
        const {
            styleLayers,
            styleLayerMenu,
            handleRemoveStyleLayer
        } = this.props;

        const {isOpen} = styleLayerMenu;

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
                            {styleLayers.map(({layerType, menuState, styleInfo}, i) =>
                                <LayerListItem key={i.toString()}
                                               layer={menuState}
                                               handleUpdate={this.handleUpdateLayer(i, layerType)}
                                               handleDelete={handleRemoveStyleLayer(i)}

                                />)
                            }

                            <AddLayerListItem handleOnClick={this.handleAddLayer}/>

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
        styleLayerMenu,
    } = state;

    return {
        styleLayers,
        styleLayerMenu
    }
}


function mapDispatchToProps(dispatch){
    return {
        handleRemoveStyleLayer: (index) => () => {
            dispatch(removeStyleLayer(index))
        },
        handleOpenHighlightMenu: (dataset, items) => {
            dispatch(openHighlightMenu(dataset, items))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapLayerMenu)