import {arrayMove} from 'react-sortable-hoc'


export const ADD_MAP_LAYER = 'ADD_MAP_LAYER';
export const REMOVE_MAP_LAYER = 'REMOVE_MAP_LAYER';
export const UPDATE_MAP_LAYER = 'UPDATE_MAP_LAYER';
export const REORDER_MAP_LAYERS = 'REORDER_MAP_LAYERS'

export const OPEN_MAP_LAYER_MENU = 'OPEN_MAP_LAYER_MENU';
export const CLOSE_MAP_LAYER_MENU = 'CLOSE_MAP_LAYER_MENU';


export const openMapLayerMenu = () => {
    return {
        type: OPEN_MAP_LAYER_MENU,
    }
}

export const closeMapLayerMenu = () => {
    return {
        type: CLOSE_MAP_LAYER_MENU
    }
}

export const toggleMapLayerMenu = () => {
    return (dispatch, getState) => {
        getState().mapLayerMenu.isOpen
            ? dispatch(closeMapLayerMenu())
            : dispatch(openMapLayerMenu())
    }
}


export const addMapLayer = (layerId, layerData) => {
    return {
        type: ADD_MAP_LAYER,
        layerId,
        layerData,
    }
};

export const removeMapLayer = (layerId) => {
    return {
        type: REMOVE_MAP_LAYER,
        layerId
    }
};

export const updateMapLayer = (layerId, layerData) => {
    return {
        type: UPDATE_MAP_LAYER,
        layerId,
        layerData
    }
};


export const reorderMapLayers = (oldIndex, newIndex) => {
    return (dispatch, getState) => {
        const currentList = getState().mapLayerList;
        dispatch(
            {
                type: REORDER_MAP_LAYERS,
                reorderedList: arrayMove(currentList, oldIndex, newIndex)
            }
        )
    }
};