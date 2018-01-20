import {getParcelFromPoint} from '../utils/mapUtils';

import {PARCEL} from "../utils/mapDefaults";
import {selectParcel} from "./parcelDataActions";


export const SET_SELECTED_PARCEL_SHAPE = 'SET_SELECTED_PARCEL_SHAPE';

export const OPEN_BASEMAP_MENU = 'OPEN_BASEMAP_MENU';
export const CLOSE_BASEMAP_MENU = 'CLOSE_BASEMAP_MENU';
export const SELECT_BASEMAP = 'SELECT_BASEMAP';

export const CHANGE_VIEWPORT = 'CHANGE_VIEWPORT';


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




export const openBasemapMenu = () => {
    return {
        type: OPEN_BASEMAP_MENU,
    }
};

export const closeBasemapMenu = () => {
    return {
        type: CLOSE_BASEMAP_MENU
    }
};

export const toggleBasemapMenu = () => {
    return (dispatch, getState) => {
        if(getState().basemap.menuIsOpen) {
            dispatch(closeBasemapMenu());
        } else {
            dispatch(openBasemapMenu());
        }
    }
};


export const selectBasemap = basemap => {
    return {
        type: SELECT_BASEMAP,
        basemap
    }
};

export const changeViewport = viewport => {
    console.log(viewport);
    return {
        type: CHANGE_VIEWPORT,
        viewport
    }
}
