import {
    OPEN_CUSTOM_STYLE_MENU,
    CLOSE_CUSTOM_STYLE_MENU,

    OPEN_HIGHLIGHT_STYLE_MENU,
    CLOSE_HIGHLIGHT_STYLE_MENU,
} from "../actions/layerEditorActions";


export const highlightMenu = (state = {isOpen: false, layerData: {}}, action) => {
    switch (action.type) {
        case OPEN_HIGHLIGHT_STYLE_MENU:
            return (Object.assign({}, state,
                {
                    isOpen: true,
                    editMode: action.editMode,
                    layerId: action.layerId,
                    layerData: action.layerData
                }));
        case CLOSE_HIGHLIGHT_STYLE_MENU:
            return (Object.assign({}, state, {isOpen: false}));
        default:
            return state;
    }
}

export const customStyleMenu = (state = {isOpen: false}, action) => {
    switch (action.type) {
        case OPEN_CUSTOM_STYLE_MENU:
            return (Object.assign({}, state,
                {
                    isOpen: true,
                    editMode: action.editMode,
                    layerId: action.layerId,
                    layerData: action.layerData
                }
            ));

        case CLOSE_CUSTOM_STYLE_MENU:
            return (Object.assign({}, state,
                {
                    isOpen: false,
                    editMode: undefined,
                    layerId: undefined,
                    layerData: undefined

                }));

        default:
            return state;
    }
}
