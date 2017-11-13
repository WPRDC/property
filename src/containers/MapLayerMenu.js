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

/* Functions */
import {COLORS} from "../utils/dataUtils";

import {green} from 'material-ui/colors';


const style = {
    drawer: {
        width: '250px',
    },
    button: {
        position: 'absolute',
        top: '12px',
        right: '52px',
        zIndex: '1001',
    },
    paper: {
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: '1001',
        width: "320px",
    }
};

const STYLE_MENU_MODES = {ADD: 'ADD', UPDATE: 'UPDATE'};


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
            currentLayerIdx: 0  // The current layer that is being styled
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
        this.setState(
            {
                styleMenuOpen: true,
                styleLayerMode: STYLE_MENU_MODES.ADD
            }
        )
    };

    /** Open style menu and let it know the index of the layer to style */
    handleUpdateLayer = idx => () => {
        const targetIdx = this.props.styleLayers.length
        this.setState(
            {
                styleMenuOpen: true,
                styleLayerMode: STYLE_MENU_MODES.ADD
            }
        )
    };


    handleRemoveLayer = targetIdx => () => {
        // Remove target layer from layers
        let newLayers = this.state.layers.filter((layer, currIdx) => currIdx !== targetIdx);
        this.setState(
            {layers: newLayers},
            // Tell have map update the styled layers
            () => {
                this.updateStyleLayers();
            }
        )
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


    updateStyleLayers = () => {
        const minimalStyleLayers = this.state.layers.map((layer) => layer.styleInfo);
        console.log(minimalStyleLayers);
        this.props.updateStyleLayers(minimalStyleLayers)
    };


    render() {
        return (
            <div>
                <Slide in={this.props.open} direction="right">
                    <Paper style={style.paper}>
                        {/* Heading */}
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Typography type="title" color="inherit">
                                    Map Layers
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        {/* Layer List */}
                        <List>
                            {this.state.layers.map((layer, i) =>
                                <LayerListItem key={i.toString()}
                                               layer={layer}
                                               handleUpdate={this.handleUpdateLayer(i)}
                                               handleDelete={this.handleRemoveLayer(i)}

                                />)
                            }

                            <AddLayerListItem handleOnClick={this.handleAddLayer}/>

                            <Divider inset/>
                            <ListItem button onClick={this.toggleBasemapMenu}>
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
                                      savedState={this.state.layers[this.state.currentLayerIdx]}
                                      handleRequestClose={this.handleRequestClose('styleMenuOpen')}
                                      updateStyleLayer={this.handleStyleMenuResults(this.state.currentLayerIdx)}/>


                    </Paper>
                </Slide>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {
        styleLayers,
    } = state;

    return {
        styleLayers
    }
}

//
// function mapDispatchToProps(dispatch){
//     return {
//         updateStyleLayer: (index, data) => {
//             dispatch(updateStyleLayer(index, data))
//         }
//     }
// }


export default connect()(MapLayerMenu)