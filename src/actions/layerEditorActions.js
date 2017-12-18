import {getDataset, getField, getAvailableDatasets, getAvailableFields} from "../utils/mapUtils";
import {dataSource} from "../utils/mapDefaults";


export const OPEN_CUSTOM_STYLE_MENU = 'OPEN_CUSTOM_STYLE_MENU';
export const CLOSE_CUSTOM_STYLE_MENU = 'CLOSE_CUSTOM_STYLE_MENU';

export const OPEN_HIGHLIGHT_STYLE_MENU = 'OPEN_HIGHLIGHT_STYLE_MENU';
export const CLOSE_HIGHLIGHT_STYLE_MENU = 'CLOSE_HIGHLIGHT_STYLE_MENU';


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++ LAYER LIST ++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++ CUSTOM STYLE MENU ++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


export const openCustomStyleMenu = (editMode, layerId, layerData) => {
    return {
        type: OPEN_CUSTOM_STYLE_MENU,
        editMode,
        layerId,
        layerData
    }
};

export const closeCustomStyleMenu = () => {
    return {
        type: CLOSE_CUSTOM_STYLE_MENU,
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

