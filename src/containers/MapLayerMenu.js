import React, {Component} from 'react';
import {connect} from 'react-redux';
/* Material UI Components 0*/
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import {green} from 'material-ui/colors'
import Divider from 'material-ui/Divider';
import BasemapListItem from "../components/map/BasemapListItem";
import Tooltip from 'material-ui/Tooltip'

/* Custom Components */
import MapLayerList from './MapLayerList'
import MapStyleMenu from './MapStyleMenu'
import {closeCustomStyleMenu, openCustomStyleMenu} from "../actions/layerEditorActions";
import {StyleMenuEditModes} from "../utils/mapDefaults";
import {reorderMapLayers} from "../actions/mapLayerActions";

/* Functions & Constants */
const style = {
  base: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    zIndex: '2',
    width: "340px",
  },
  addButton: {
    position: 'absolute',
    top: '34px',
    right: '16px',
    backgroundColor: green[400],
    zIndex: '200'
  }
};


class MapLayerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // UI states
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
      layerCount,
      handleAddLayer,
      handleSortEnd
    } = this.props;

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

            <Tooltip title="Add A Layer">
              <Button fab color="primary" aria-label="add" style={style.addButton}
                      onClick={handleAddLayer}>
                <AddIcon/>
              </Button>
            </Tooltip>
            <MapLayerList
              distance={4} l
              ockAxis={'y'}
              lockToContainerEdges={true}
              onSortEnd={handleSortEnd}
              helperClass='sortableHelper'/>

            {layerCount ? <Divider/> : null}

            <BasemapListItem/>

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
  const layerCount = state.mapLayerList.length

  return {
    isOpen,
    layerCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => dispatch(closeCustomStyleMenu()),
    handleAddLayer: () => dispatch(openCustomStyleMenu(StyleMenuEditModes.ADD)),
    handleSortEnd: ({oldIndex, newIndex}) => dispatch(reorderMapLayers(oldIndex, newIndex))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapLayerMenu)