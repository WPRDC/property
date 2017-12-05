import {getParcelFromPoint} from '../utils/mapUtils';

import {PARCEL} from "../utils/mapDefaults";
import {selectParcel} from "./searchActions";


export const SET_SELECTED_PARCEL_SHAPE = 'SET_SELECTED_PARCEL_SHAPE';
export const CENTER_MAP_ON_POINT = 'CENTER_MAP_ON_POINT';

export const ADD_STYLE_LAYER = 'ADD_STYLE_LAYER';
export const UPDATE_STYLE_LAYER = 'UPDATE_STYLE_LAYER';
export const REMOVE_STYLE_LAYER = 'REMOVE_STYLE_LAYER';

export const OPEN_STYLE_LAYER_MENU = 'OPEN_STYLE_LAYER_MENU';
export const CLOSE_STYLE_LAYER_MENU = 'CLOSE_STYLE_LAYER_MENU';

export const SET_BASEMAP = 'SET_BASEMAP';

export const OPEN_HIGHLIGHT_MENU = "OPEN_HIGHLIGHT_MENU";
export const CLOSE_HIGHLIGHT_MENU = "CLOSE_HIGHLIGHT_MENU";
export const SELECT_HIGHLIGHT_MENU_FIELD = 'SELECT_HIGHLIGHT_MENU_FIELD'


export const fetchParcelFromPoint = point => {
    return dispatch => {
        return getParcelFromPoint(point)
            .then(
                parcelId => dispatch(selectParcel(parcelId)),
                error => console.log('ERROR', error)
            )
    }
};

export const setSelectedParcelShape = (parcelId, shapeClass = PARCEL) => {
    return {
        type: SET_SELECTED_PARCEL_SHAPE,
        parcelId,
        shapeClass
    }
};

export const centerMapOnPoint = point => {
    return {
        type: CENTER_MAP_ON_POINT,
        point
    }
};

export const addStyleLayer = (layerType, menuState, styleInfo) => {
    return {
        type: ADD_STYLE_LAYER,
        layerType,
        menuState,
        styleInfo
    }
};

export const updateStyleLayer = (index, menuState, styleInfo) => {
    return {
        type: UPDATE_STYLE_LAYER,
        index,
        menuState,
        styleInfo
    }
};

export const openStyleLayerMenu = () => {
    return {
        type: OPEN_STYLE_LAYER_MENU
    }
};

export const closeStyleLayerMenu = () => {
    return {
        type: CLOSE_HIGHLIGHT_MENU
    }
};

export const removeStyleLayer = (index) => {
    return {
        type: REMOVE_STYLE_LAYER,
        index
    }
};

export const setBasemap = basemapName => {
    return {
        type: SET_BASEMAP,
        basemapName
    }
};

export const openHighlightMenu = (dataset, items) => {
    return {
        type: OPEN_HIGHLIGHT_MENU,
        dataset,
        items,
    }
};

export const closeHighlightMenu = () => {
    return {
        type: CLOSE_HIGHLIGHT_MENU,
    }
};

export const selectHighlightMenuField = selectedIndex => {
    return {
        type: SELECT_HIGHLIGHT_MENU_FIELD,
        selectedIndex
    }
};