import {
    DISPLAY_STYLE_LAYER_LIST_MENU,
    HIDE_STYLE_LAYER_LIST_MENU,

    ADD_STYLE_LAYER,
    REMOVE_STYLE_LAYER,
    UPDATE_STYLE_LAYER,

    CLOSE_CUSTOM_STYLE_MENU,
    OPEN_CUSTOM_STYLE_MENU,
    TOGGLE_STYLE_LAYER_LIST_MENU,

    CLOSE_HIGHLIGHT_MENU,
    OPEN_HIGHLIGHT_MENU,

    SELECT_HIGHLIGHT_MENU_FIELD,

    REORDER_STYLE_LAYER,
    SELECT_HIGHLIGHT_MENU_COLOR
} from "../actions/styleMenuActions";

import {arrayMove} from "react-sortable-hoc";
import {
    CHANGE_CUSTOM_STYLE_MENU_TAB, SELECT_CUSTOM_STYLE_DATASET, SELECT_CUSTOM_STYLE_FIELD, SELECT_CUSTOM_STYLE_VALUE,
    UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS, UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS, UPDATE_CUSTOM_STYLE_AVAILABLE_VALUES,
    UPDATE_CUSTOM_STYLE_COLOR_MODE,
    UPDATE_CUSTOM_STYLE_INFO, UPDATE_CUSTOM_STYLE_LAYER_NAME, UPDATE_CUSTOM_STYLE_SUBMENU
} from "../actions";
import {getAvailableDatasets, getAvailableFields} from "../utils/mapUtils";


const DEFAULT_HIGHLIGHT_STATE = {
    dataset: {},
    items: [],
    selectedIndex: 0,
    color: '#11f',
    isOpen: false
}

const DEFAULT_CUSTOM_STYLE_STATE = {
    isOpen: false,
    currentTab: 'category',
    styleInfo: {sql: '', css: ''},
}


export const styleLayers = (state = [], action) => {
    const {layerType, menuState, styleInfo} = action;
    switch (action.type) {
        case ADD_STYLE_LAYER:
            return [...state, {layerType, menuState, styleInfo}];
        case UPDATE_STYLE_LAYER:
            return state.map((styleLayer, idx) =>
                (idx === action.index)
                    ? Object.assign({}, styleLayer, {menuState, styleInfo})
                    : styleLayer
            );
        case REMOVE_STYLE_LAYER:
            return state.filter((styleLayer, currIndex) => currIndex !== action.index);
        case REORDER_STYLE_LAYER:
            return arrayMove(state, action.oldIndex, action.newIndex);
        default:
            return state
    }
};

export const styleMenu = (state = DEFAULT_CUSTOM_STYLE_STATE, action) => {
    const {
        mode,
        layerIndex,
        styleInfo,
        nextTab,
        dataset,
        field,
        availableValues,
        value,
        styleMode,
        layerName,
        colorMode,
        submenu,
        submenuState
    } = action;

    switch (action.type) {
        case OPEN_CUSTOM_STYLE_MENU:
            return Object.assign({}, state,
                {
                    mode,
                    layerIndex,
                    isOpen: true
                }
            );
        case CLOSE_CUSTOM_STYLE_MENU:
            return Object.assign({}, state, {
                isOpen: false
            });
        case UPDATE_CUSTOM_STYLE_INFO:
            return Object.assign({}, state, {
                styleInfo
            });

        case CHANGE_CUSTOM_STYLE_MENU_TAB:
            return Object.assign({}, state, {
                currentTab: nextTab
            });

        case SELECT_CUSTOM_STYLE_DATASET:
            return Object.assign({}, state, {
                selectedDataset: dataset
            });

        case SELECT_CUSTOM_STYLE_FIELD:
            return Object.assign({}, state, {
                selectedField: field
            });

        case SELECT_CUSTOM_STYLE_VALUE:
            return Object.assign({}, state, {
                selectedValue: value
            });

        case UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS:
            return Object.assign({}, state, {
                availableDatasets: getAvailableDatasets(styleMode)
            });

        case UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS:
            return Object.assign({}, state, {
                availableFields: getAvailableFields(styleMode, dataset)
            });

        case UPDATE_CUSTOM_STYLE_AVAILABLE_VALUES:
            return Object.assign({}, state, {
                availableValues
            });

        case UPDATE_CUSTOM_STYLE_LAYER_NAME:
            return Object.assign({}, state, {
                layerName
            });


        case UPDATE_CUSTOM_STYLE_COLOR_MODE:
            return Object.assign({}, state, {
                colorMode
            });

        case UPDATE_CUSTOM_STYLE_SUBMENU:
            return Object.assign({}, state, {
                submenu: {[submenu]: submenuState}
            });

        default:
            return state
    }
};


export const highlightMenu = (state = DEFAULT_HIGHLIGHT_STATE, action) => {
    const {dataset, layerIndex, items, selectedIndex, color} = action;

    switch (action.type) {
        case OPEN_HIGHLIGHT_MENU:
            return Object.assign({}, state,
                {
                    layerIndex,
                    dataset,
                    items,
                    isOpen: true
                }
            );
        case CLOSE_HIGHLIGHT_MENU:
            return Object.assign({}, state, {isOpen: false});
        case SELECT_HIGHLIGHT_MENU_FIELD:
            return Object.assign({}, state, {selectedIndex});
        case SELECT_HIGHLIGHT_MENU_COLOR:
            return Object.assign({}, state, {color});
        default:
            return state
    }
};

export const styleLayerListMenu = (state = {isOpen: false}, action) => {

    switch (action.type) {
        case DISPLAY_STYLE_LAYER_LIST_MENU:
            return Object.assign({}, state, {isOpen: true});
        case CLOSE_HIGHLIGHT_MENU:
            return Object.assign({}, state, {isOpen: false});
        case TOGGLE_STYLE_LAYER_LIST_MENU:
            return Object.assign({}, state, {isOpen: !state.isOpen});
        default:
            return state
    }
};