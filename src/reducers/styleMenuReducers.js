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


const DEFAULT_HIGHLIGHT_STATE = {
    dataset: {},
    items: [],
    selectedIndex: 0,
    color: '#11f',
    isOpen: false
}

const DEFAULT_CUSTOM_STYLE_STATE = {
    isOpen: false
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
    const {mode, layerIndex} = action;
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
        default:
            return state
    }
};


export const highlightMenu = (state = DEFAULT_HIGHLIGHT_STATE,
                              action) => {

    const {dataset, layerIndex, items, selectedIndex, color} = action;

    switch (action.type) {
        case OPEN_HIGHLIGHT_MENU:
            return Object.assign({}, state,
                {
                    dataset,
                    layerIndex,
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