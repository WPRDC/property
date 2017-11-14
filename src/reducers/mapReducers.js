import {singleShapeLayer} from "../utils/mapUtils";
import {BASEMAPS, SELECTION_LAYERS} from "../utils/mapDefaults";

import {
    SET_BASEMAP, SET_SELECTED_PARCEL_SHAPE, CENTER_MAP_ON_POINT, ADD_STYLE_LAYER,
    UPDATE_STYLE_LAYER, REMOVE_STYLE_LAYER
} from "../actions/mapActions";

export const availableShapesLayer = (state = SELECTION_LAYERS.PARCEL, action) => {
    return state
};

export const basemapLayer = (state = BASEMAPS.voyager, action) => {
    switch (action.type) {
        case SET_BASEMAP:
            return BASEMAPS[(action.basemapName)]
        default:
            return state
    }
};

export const selectedLayer = (state = {}, action) => {
    switch (action.type) {
        case SET_SELECTED_PARCEL_SHAPE:
            return {
                id: action.parcelId,
                stuff: 'stuff',
                class: action.shapeClass,
                ...(singleShapeLayer(action.parcelId, action.shapeClass))
            };
        default:
            return state
    }
};

export const mapOptions = (state = {center: [40.438340, -79.961884], zoom: 16}, action) => {
    switch (action.type) {
        case CENTER_MAP_ON_POINT:
            return {center: action.point, zoom: 16};
        default:
            return state
    }
};

export const styleLayers = (state = [], action) => {
    switch (action.type) {
        case ADD_STYLE_LAYER:
            return [...state, action.styleLayerData];
        case UPDATE_STYLE_LAYER:
            return state.map((styleLayer, idx) =>
                (idx === action.index)
                    ? action.styleLayerData
                    : styleLayer
            );
        case REMOVE_STYLE_LAYER:
            return state.filter((styleLayer, currIndex) => currIndex !== action.index);
        default:
            return state
    }
}

