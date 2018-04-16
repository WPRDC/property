import {connect} from 'react-redux';
import LayerList from '../components/map/LayerList'
import {addMapLayer, removeMapLayer, updateMapLayer} from "../actions/mapLayerActions";
import {guid} from "../utils/dataUtils";
import {LayerTypes, StyleMenuEditModes} from "../utils/mapDefaults";
import {openCustomStyleMenu, openHighlightStyleMenu} from "../actions/layerEditorActions";

import {arrayMove} from "react-sortable-hoc"

const mapStateToProps = state => {
  const {
    mapLayerList,
    mapLayersById,
  } = state;
  return {mapLayerList, mapLayersById}

}

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteLayer: (layerId) => () => {
      dispatch(removeMapLayer(layerId))
    },
    handleOpenEditMenu: (mapLayersById, layerId) => () => {
      const currentLayer = mapLayersById[layerId];

      switch (currentLayer.layerType) {
        case LayerTypes.CUSTOM:
          dispatch(openCustomStyleMenu(StyleMenuEditModes.UPDATE, layerId, currentLayer));
          break;
        case LayerTypes.HIGHLIGHT:
          dispatch(openHighlightStyleMenu(StyleMenuEditModes.UPDATE, layerId, currentLayer));
          break;
      }
    },
    handleAddLayer: () => {
      dispatch(openCustomStyleMenu(StyleMenuEditModes.ADD))
    }
  }
}

const MapLayerList = connect(mapStateToProps, mapDispatchToProps)(LayerList);

export default MapLayerList