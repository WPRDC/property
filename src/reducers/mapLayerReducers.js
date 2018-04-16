import {
  ADD_MAP_LAYER,
  OPEN_MAP_LAYER_MENU,
  CLOSE_MAP_LAYER_MENU,
  REMOVE_MAP_LAYER,
  UPDATE_MAP_LAYER, REORDER_MAP_LAYERS
} from "../actions/mapLayerActions";

const DEFAULT_LAYER = {
  layerName: '',
  menuState: null,
  styleInfo: {sql: '', css: ''}
}

export const mapLayerMenu = (state = {}, action) => {
  switch (action.type) {
    case OPEN_MAP_LAYER_MENU:
      return Object.assign({}, state, {isOpen: true});
    case CLOSE_MAP_LAYER_MENU:
      return Object.assign({}, state, {isOpen: false});
    default:
      return state;
  }
}

export const mapLayersById = (state = {}, action) => {
  switch (action.type) {
    case ADD_MAP_LAYER:
      return Object.assign({}, state,
        {
          [action.layerId]: action.layerData
        }
      );
    case REMOVE_MAP_LAYER:
      // todo: remove the layer if it turns out ot be necessary
      return state;
    case UPDATE_MAP_LAYER:
      return Object.assign({}, state,
        {
          [action.layerId]: action.layerData
        });
    default:
      return state;
  }
};

export const mapLayerList = (state = [], action) => {
  switch (action.type) {
    case ADD_MAP_LAYER:
      return [...state, action.layerId];
    case REMOVE_MAP_LAYER:
      return state.filter(layerId => layerId !== action.layerId)
    case REORDER_MAP_LAYERS:
      return action.reorderedList;
    default:
      return state;
  }
}

