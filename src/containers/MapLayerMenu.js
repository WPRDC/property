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
import {closeCustomStyleMenu} from "../actions/layerEditorActions";

/* Functions & Constants */
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
            isOpen,
            styleMenuIsOpen
        } = this.props;
        console.log(styleMenuIsOpen);
        return (
            <div style={style.base}>
                <Slide in={isOpen} direction="right">
                    <Paper>
                        <AppBar position="static" color="primary">
                            <Toolbar>
                                <Typography type="title" color="inherit">
                                    Map Layers
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <MapLayerList/>
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

    const styleMenuIsOpen = state.customStyleMenu.isOpen

    return {
        isOpen,
        styleMenuIsOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeMenu: () => dispatch(closeCustomStyleMenu())
    }
}


export default connect(mapStateToProps)(MapLayerMenu)