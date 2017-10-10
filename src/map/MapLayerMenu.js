import React, {Component} from 'react';

/* Material UI Components 0*/
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Card, {CardActions, CardContent, CardHeader, CardMedia} from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText, ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';


import Avatar from 'material-ui/Avatar';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import Slide from 'material-ui/transitions/Slide';
import Fade from 'material-ui/transitions/Fade'
import Tabs, {Tab} from 'material-ui/Tabs';
import BaseMapMenu from './BaseMapMenu'
import MapStyleMenu from './MapStyleMenu'
/* Icons */
import LayersIcon from 'material-ui-icons/Layers';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';


/* Functions */
import {COLORS} from "../utils/dataUtils";


class MapLayerMenu extends Component {
    constructor(props) {
        super(props);

        const defaultBasemap = props.basemaps[Object.keys(props.basemaps)[0]]

        this.state = {
            open: false,

            basemapName: defaultBasemap.name,

            basemapMenuOpen: false,
            styleMenuOpen: false,

            basemapMenuAnchorEl: null,

            layers: [],
            currentLayerIdx: 0  // The current layer that is being styled
        }
    }

    toggleSlide = (open) => () => {
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
     * Updates the basemaps name on the menu, and lifts the selected basemap's id state, `basemap`
     * to the Map for rendering.
     *
     * @param {id} basemap - id of basemap that was selected
     */
    updateBasemap = basemap => {
        this.setState(
            {basemapName: this.props.basemaps[basemap].name},
            this.props.updateBasemap(basemap)// lift up to Map for actual rendering of new basemap
        )
    };


    /**
     * Brings up new layer dialog.
     * Runs when add new layer button is clicked.
     */
    handleAddLayer = () => {
        this.setState(
            {styleMenuOpen: true, currentLayerIdx: this.state.layers.length}
        )
    };


    handleUpdateLayer = idx => () => {
        this.setState(
            {styleMenuOpen: true, currentLayerIdx: idx}
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
            // Lift SQL and CSS up to Map to render the style
            () => {
                // TODO: send list of layers for map to handle
                this.updateStyleLayers()
            }
        );

    };

    updateStyleLayers = () => {
        const minimalStyleLayers = this.state.layers.map((layer) => layer.styleInfo);
        this.props.updateStyleLayers(minimalStyleLayers)
    };


    render() {
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


        return (
            <div>
                <Button fab color="primary" aria-label="add" onClick={this.toggleSlide(!(this.state.open))}
                        style={style.button}>
                    <LayersIcon/>
                </Button>

                <Slide in={this.state.open} direction="right">
                    <Paper style={style.paper}>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Typography type="title" color="inherit">
                                    Map Layers
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <List>
                            {this.state.layers.map((layer, i) =>
                                <LayerListItem key={i.toString()}
                                               handleUpdate={this.handleUpdateLayer(i)}
                                               handleDelete={this.handleRemoveLayer(i)}

                                />)}
                            <AddLayerListItem handleOnClick={this.handleAddLayer}/>
                            <Divider/>
                            <ListItem button onClick={this.toggleBasemapMenu}>
                                <ListItemText primary={"Basemap Layer"} secondary={this.state.basemapName}/>
                                <BaseMapMenu open={this.state.basemapMenuOpen}
                                             anchorEl={this.state.basemapMenuAnchorEl}
                                             handleRequestClose={this.handleRequestClose('basemapMenuOpen')}
                                             updateBasemap={this.updateBasemap}
                                             basemaps={this.props.basemaps}
                                />
                            </ListItem>
                        </List>

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


function LayerListItem(props) {
    const primaryText = props.primaryText || "Style Layer";
    const secondaryText = props.secondaryText || "";
    return (
        <ListItem button onClick={props.handleUpdate}>
            <ListItemAvatar>
                <Avatar>
                    <LayersIcon/>
                </Avatar>
            </ListItemAvatar>

            <ListItemText primary={primaryText} secondary={secondaryText}/>

            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={props.handleDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

function AddLayerListItem(props) {
    return (
        <ListItem button onClick={props.handleOnClick}>
            <ListItemAvatar>
                <Avatar>
                    <AddIcon/>
                </Avatar>
            </ListItemAvatar>

            <ListItemText primary={"New Style Layer"}/>
        </ListItem>
    );
}


export default MapLayerMenu;