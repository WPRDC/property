import {singleShapeLayer} from "../utils/mapUtils";
import {arrayMove} from 'react-sortable-hoc';

import {
    SELECT_BASEMAP, SET_SELECTED_PARCEL_SHAPE, CENTER_MAP_ON_POINT, OPEN_BASEMAP_MENU, CLOSE_BASEMAP_MENU,
    CHANGE_VIEWPORT
} from "../actions/mapActions";

import {BASEMAPS, SELECTION_LAYERS} from "../utils/mapDefaults";
const DEFAULT_BASEMAP = BASEMAPS.voyager


export const availableShapesLayer = (state = SELECTION_LAYERS.PARCEL, action) => {
    return state
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

export const viewport = (state = {center: [40.438340, -79.961884], zoom: 16}, action) => {
    switch (action.type) {
        case CHANGE_VIEWPORT:
            return Object.assign({}, state, action.viewport);
        default:
            return state
    }
};

export const basemap = (state = {menuIsOpen: false, selectedBasemap: DEFAULT_BASEMAP}, action) => {
    switch(action.type){
        case OPEN_BASEMAP_MENU:
            return Object.assign({}, state, {menuIsOpen: true, anchorEl: action.anchorEl});
        case CLOSE_BASEMAP_MENU:
            return Object.assign({}, state, {menuIsOpen: false, anchorEl: null});
        case SELECT_BASEMAP:
            return Object.assign({}, state, {selectedBasemap: action.basemap})
        default:
            return state;
    }
};
