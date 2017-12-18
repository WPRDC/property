import {getAvailableValues, getFieldValues} from "../utils/mapUtils";
import {extractAddressFromData} from "../utils/dataUtils";
import {getStreetViewImage} from "../utils/apiUtils";

export const DISPLAY_STYLE_LAYER_LIST_MENU = 'DISPLAY_STYLE_LAYER_LIST_MENU';
export const HIDE_STYLE_LAYER_LIST_MENU = 'HIDE_STYLE_LAYER_LIST_MENU';
export const TOGGLE_STYLE_LAYER_LIST_MENU = 'TOGGLE_STYLE_LAYER_LIST_MENU';

export const ADD_STYLE_LAYER = 'ADD_STYLE_LAYER';
export const UPDATE_STYLE_LAYER = 'UPDATE_STYLE_LAYER';
export const REMOVE_STYLE_LAYER = 'REMOVE_STYLE_LAYER';
export const REORDER_STYLE_LAYER = 'REORDER_STYLE_LAYER';

// Style Menu as a whole
export const CHANGE_CUSTOM_STYLE_MENU_TAB = "CHANGE_CUSTOM_STYLE_MENU_TAB";
export const SELECT_CUSTOM_STYLE_DATASET = "SELECT_CUSTOM_STYLE_DATASET";
export const SELECT_CUSTOM_STYLE_FIELD = "SELECT_CUSTOM_STYLE_FIELD";
export const UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS = "UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS";
export const UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS = "UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS";
export const UPDATE_CUSTOM_STYLE_LAYER_NAME = "UPDATE_CUSTOM_STYLE_LAYER_NAME";
export const UPDATE_CUSTOM_STYLE_COLOR_MODE = "UPDATE_CUSTOM_STYLE_COLOR_MODE";
export const UPDATE_CUSTOM_STYLE_SUBMENU = "UPDATE_CUSTOM_STYLE_SUBMENU";

// Category style submenu
export const UPDATE_CUSTOM_STYLE_AVAILABLE_VALUES = "UPDATE_CUSTOM_STYLE_AVAILABLE_VALUES";
export const SELECT_CUSTOM_STYLE_VALUE = "SELECT_CUSTOM_STYLE_VALUE";

// 
export const OPEN_CUSTOM_STYLE_MENU = "OPEN_CUSTOM_STYLE_MENU";
export const CLOSE_CUSTOM_STYLE_MENU = "CLOSE_CUSTOM_STYLE_MENU";
export const UPDATE_CUSTOM_STYLE_INFO = "UPDATE_CUSTOM_STYLE_INFO"

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

export const toggleStyleLayerListMenu = () => {
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

export const closeCustomStyleMenu = () => {
    return {
        type: CLOSE_CUSTOM_STYLE_MENU,
    }
}

export const updateCustomStyleInfo = styleInfo => {
    return {
        type: UPDATE_CUSTOM_STYLE_INFO,
        styleInfo
    }
};


export const changeCustomStyleMenuTab = nextTab => {
    return {
        type: CHANGE_CUSTOM_STYLE_MENU_TAB,
        nextTab
    }
};

export const selectCustomStyleDataset = dataset => {
    return {
        type: SELECT_CUSTOM_STYLE_DATASET,
        dataset
    }
};

export const selectCustomStyleField = field => {
    return {
        type: SELECT_CUSTOM_STYLE_FIELD,
        field
    }
};

export const updateCustomStyleAvailableDatasets = styleMode => {
    return {
        type: UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS,
        styleMode
    }
};


export const updateCustomStyleAvailableFields = (styleMode, dataset) => {
    return {
        type: UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS,
        styleMode,
        dataset
    }
};


export const updateCustomStyleAvailableValues = (availableValues) => {
    return {
        type: UPDATE_CUSTOM_STYLE_AVAILABLE_VALUES,
        availableValues
    }
};

export const fetchCustomStyleAvailableValues = () => {
    return (dispatch, getState) => {
        const {selectedDataset, selectedField} = getState().styleMenu;
        return getFieldValues(selectedDataset, selectedField)
            .then(
                (newValues) => {
                    newValues.sort();
                    dispatch(updateCustomStyleAvailableValues(newValues));
                    const firstValue = getState().styleMenu.availableValues[0];
                    dispatch(selectCustomStyleValue(firstValue))
                },
                (err) => {
                    console.log(err)
                }
            )
    }
};

export const selectCustomStyleValue = value => {
    return {
        type: SELECT_CUSTOM_STYLE_VALUE,
        value
    }
};

export const updateAvailableDatasetsAndFields = (styleMode)=>{
    return (dispatch, getState) => {
        dispatch(updateCustomStyleAvailableDatasets(styleMode));
        const dataset = getState().styleMenu.availableDatasets[0];
        dispatch(selectCustomStyleDataset(dataset));

        dispatch(updateAvailableFields(styleMode, dataset))
    }
}

export const updateAvailableFields = (styleMode, dataset) => {
    return (dispatch, getState) => {
        // Get Fields
        dispatch(updateCustomStyleAvailableFields(styleMode, dataset));
        // ... and select first one
        const firstField = getState().styleMenu.availableFields[0];
        dispatch(selectCustomStyleField(firstField));
    }
}

export const updateCustomStyleLayerName = layerName => {
    return {
        type: UPDATE_CUSTOM_STYLE_LAYER_NAME,
        layerName
    }
};

export const updateCustomStyleColorMode = colorMode => {
    return {
        type: UPDATE_CUSTOM_STYLE_COLOR_MODE,
        colorMode
    }
};

export const updateCustomStyleSubmenu = (submenu, submenuState) => {
    return {
        type: UPDATE_CUSTOM_STYLE_SUBMENU,
        submenu,
        submenuState
    }
};


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


