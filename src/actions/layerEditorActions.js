import {getDataset, getField, getAvailableDatasets, getAvailableFields} from "../utils/mapUtils";
import {dataSource} from "../utils/mapDefaults";


export const OPEN_CUSTOM_STYLE_MENU = 'OPEN_CUSTOM_STYLE_MENU';
export const CLOSE_CUSTOM_STYLE_MENU = 'CLOSE_CUSTOM_STYLE_MENU';

export const CHANGE_CUSTOM_STYLE_MENU_TAB = "CHANGE_CUSTOM_STYLE_MENU_TAB";
export const SELECT_CUSTOM_STYLE_DATASET = "SELECT_CUSTOM_STYLE_DATASET";
export const SELECT_CUSTOM_STYLE_FIELD = "SELECT_CUSTOM_STYLE_FIELD";
export const UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS = "UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS";
export const UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS = "UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS";

export const UPDATE_CUSTOM_STYLE_STYLE_INFO = "UPDATE_CUSTOM_STYLE_STYLE_INFO";
export const UPDATE_CUSTOM_STYLE_SUBMENU_STATE = "UPDATE_CUSTOM_STYLE_SUBMENU_STATE";
export const UPDATE_CUSTOM_STYLE_LAYER_NAME = "UPDATE_CUSTOM_STYLE_LAYER_NAME";

export const OPEN_HIGHLIGHT_STYLE_MENU = 'OPEN_HIGHLIGHT_STYLE_MENU';
export const CLOSE_HIGHLIGHT_STYLE_MENU = 'CLOSE_HIGHLIGHT_STYLE_MENU';


export const openCustomStyleMenu = () => {
    return {
        type: OPEN_CUSTOM_STYLE_MENU
    }
};

export const closeCustomStyleMenu = () => {
    return {
        type: CLOSE_CUSTOM_STYLE_MENU,
    }
};

export const changeCustomStyleMenuTab = nextTab => {
    return {
        type: CHANGE_CUSTOM_STYLE_MENU_TAB,
        nextTab
    }
};

export const selectCustomStyleDataset = selectedDatasetId => {
    const selectedDataset = getDataset(selectedDatasetId);
    return {
        type: SELECT_CUSTOM_STYLE_DATASET,
        selectedDataset
    }
};

export const selectCustomStyleDatasetAndUpdateFields = selectedDatasetId => {
    return (dispatch, getState) => {

        dispatch(selectCustomStyleDataset(selectedDatasetId));
        const {currentTab, selectedDataset} = getState().customStyleMenu;
        dispatch(updateCustomStyleAvailableFields(currentTab,selectedDataset))
        const firstField = getState().customStyleMenu.availableFields[0];
        dispatch(selectCustomStyleField(selectedDataset.id, firstField.id))
    }
}

export const selectCustomStyleField = (selectedDatasetId, selectedFieldId) => {
    const selectedField = getField(selectedDatasetId, selectedFieldId);
    return {
        type: SELECT_CUSTOM_STYLE_FIELD,
        selectedField
    }
};

export const updateCustomStyleAvailableDatasets = (styleMode) => {
    return {
        type: UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS,
        availableDatasets: getAvailableDatasets(styleMode)
    }
}

export const updateCustomStyleAvailableFields = (styleMode, dataset) => {
    return {
        type: UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS,
        availableFields: getAvailableFields(styleMode, dataset)
    }
};

export const updateCustomStyleAvailableDataSource = (styleMode) => {
    return (dispatch, getState) => {
        dispatch(updateCustomStyleAvailableDatasets(styleMode));

        const dataset = getState().customStyleMenu.availableDatasets[0];
        dispatch(selectCustomStyleDataset(dataset.id));
        dispatch(updateCustomStyleAvailableFields(styleMode, dataset));

        const field = getState().customStyleMenu.availableFields[0];
        dispatch(selectCustomStyleField(dataset.id, field.id))
    }
};

export const updateCustomStyleStyleInfo = styleInfo => {
    return {
        type: UPDATE_CUSTOM_STYLE_STYLE_INFO,
        styleInfo
    }
};

export const updateCustomStyleSubmenuState = (submenu, submenuState) => {
    return {
        type: UPDATE_CUSTOM_STYLE_SUBMENU_STATE,
        submenu,
        submenuState
    }
}

export const updateCustomStyleLayerName = layerName => {
    return {
        type: UPDATE_CUSTOM_STYLE_LAYER_NAME,
        layerName
    }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++ HIGHLIGHT MENU ++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const openHighlightStyleMenu = () => {
    return {
        type: OPEN_HIGHLIGHT_STYLE_MENU
    }
}

export const closeHighlightStyleMenu = () => {
    return {
        type: CLOSE_CUSTOM_STYLE_MENU
    }
}

