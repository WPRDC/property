export const ADD_MAP_LAYER = 'ADD_MAP_LAYER';
export const REMOVE_MAP_LAYER = 'REMOVE_MAP_LAYER';
export const UPDATE_MAP_LAYER = 'UPDATE_MAP_LAYER';

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


export const addMapLayer = (layerId, layerType) => {
    return {
        type: ADD_MAP_LAYER,
        layerId,
        layerType
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

