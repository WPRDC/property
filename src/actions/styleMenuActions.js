export const DISPLAY_STYLE_LAYER_LIST_MENU = 'DISPLAY_STYLE_LAYER_LIST_MENU';
export const HIDE_STYLE_LAYER_LIST_MENU = 'HIDE_STYLE_LAYER_LIST_MENU';
export const TOGGLE_STYLE_LAYER_LIST_MENU = 'TOGGLE_STYLE_LAYER_LIST_MENU';

export const ADD_STYLE_LAYER = 'ADD_STYLE_LAYER';
export const UPDATE_STYLE_LAYER = 'UPDATE_STYLE_LAYER';
export const REMOVE_STYLE_LAYER = 'REMOVE_STYLE_LAYER';
export const REORDER_STYLE_LAYER = 'REORDER_STYLE_LAYER';

export const OPEN_CUSTOM_STYLE_MENU = "OPEN_CUSTOM_STYLE_MENU";
export const CLOSE_CUSTOM_STYLE_MENU = "CLOSE_CUSTOM_STYLE_MENU";

export const OPEN_HIGHLIGHT_MENU = "OPEN_HIGHLIGHT_MENU";
export const CLOSE_HIGHLIGHT_MENU = "CLOSE_HIGHLIGHT_MENU";
export const SELECT_HIGHLIGHT_MENU_FIELD = 'SELECT_HIGHLIGHT_MENU_FIELD';
export const SELECT_HIGHLIGHT_MENU_COLOR = 'SELECT_HIGHLIGHT_MENU_COLOR';


export const displayStyleLayerListMenu = () => {
    return {
        type: DISPLAY_STYLE_LAYER_LIST_MENU,
    }
};

export const hideStyleLayerListMenu = () => {
    return {
        type: HIDE_STYLE_LAYER_LIST_MENU
    }
};

export const toggleStyleLayerListMenu = () =>{
    return {
        type: TOGGLE_STYLE_LAYER_LIST_MENU
    }
};

// STYLE LAYERS (both custom and highlight)

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


export const removeStyleLayer = (index) => {
    return {
        type: REMOVE_STYLE_LAYER,
        index
    }
};

export const reorderStyleLayer = (oldIndex, newIndex) => {
    return {
        type: REORDER_STYLE_LAYER,
        oldIndex,
        newIndex
    }
};

// CUSTOM LAYERS

export const openCustomStyleMenu = (mode, layerIndex,) => {
    return {
        type: OPEN_CUSTOM_STYLE_MENU,
        mode,
        layerIndex
    }
}

export const closeCustomStyleMenu = (mode, layerIndex,) => {
    return {
        type: CLOSE_CUSTOM_STYLE_MENU,
    }
}


// HIGHLIGHT LAYERS

export const openHighlightMenu = (mode, layerIndex, dataset, items) => {
    return {
        type: OPEN_HIGHLIGHT_MENU,
        mode,
        layerIndex,
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

export const selectHighlightMenuColor = color => {
    return {
        type: SELECT_HIGHLIGHT_MENU_COLOR,
        color
    }
}


