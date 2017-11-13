import {getParcelFromPoint} from '../utils/mapUtils';

import {PARCEL} from "../utils/mapDefaults";
import {selectParcel} from "./searchActions";


export const SET_SELECTED_PARCEL_SHAPE = 'SET_SELECTED_PARCEL_SHAPE';
export const CENTER_MAP_ON_POINT = 'CENTER_MAP_ON_POINT';

export const ADD_STYLE_LAYER = 'ADD_STYLE_LAYER';
export const UPDATE_STYLE_LAYER = 'UPDATE_STYLE_LAYER'

export const SET_BASEMAP = 'SET_BASEMAP'

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

export const addStyleLayer = styleLayerData => {
    return {
        type: ADD_STYLE_LAYER,
        styleLayerData
    }
};

export const updateStyleLayer = (index, styleLayerData) => {
    return {
        type: UPDATE_STYLE_LAYER,
        index,
        styleLayerData
    }
};

export const setBasemap = basemapName => {
    return {
        type: SET_BASEMAP,
        basemapName
    }
};
