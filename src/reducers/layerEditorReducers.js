import {
    OPEN_CUSTOM_STYLE_MENU,
    CLOSE_CUSTOM_STYLE_MENU,
    CHANGE_CUSTOM_STYLE_MENU_TAB,

    SELECT_CUSTOM_STYLE_DATASET,
    SELECT_CUSTOM_STYLE_FIELD,
    UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS,
    UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS,

    OPEN_HIGHLIGHT_STYLE_MENU,
    CLOSE_HIGHLIGHT_STYLE_MENU,
    UPDATE_CUSTOM_STYLE_STYLE_INFO, UPDATE_CUSTOM_STYLE_SUBMENU_STATE, UPDATE_CUSTOM_STYLE_LAYER_NAME

} from "../actions/layerEditorActions";
import {getAvailableDatasets, getAvailableFields} from "../utils/mapUtils";

const DEFAULT_AVAILABLE_DATASETS = getAvailableDatasets('category');
const DEFAULT_AVAILABLE_FIELDS = getAvailableFields('category', DEFAULT_AVAILABLE_DATASETS[0]);


const DEFAULT_CUSTOM_STYLE_MENU = {
    isOpen: false,
    currentTab: 'category',
    selectedDataset: DEFAULT_AVAILABLE_DATASETS[0],
    selectedField: DEFAULT_AVAILABLE_FIELDS[0],
    availableDatasets: DEFAULT_AVAILABLE_DATASETS,
    availableFields: DEFAULT_AVAILABLE_FIELDS,
    submenuStates: {}

}

export const highlightMenu = (state={}, action) => {
    switch(action.type){
        case OPEN_HIGHLIGHT_STYLE_MENU:
            return (Object.assign({}, state, {isOpen: true}));
        case CLOSE_HIGHLIGHT_STYLE_MENU:
            return (Object.assign({}, state, {isOpen: false}));
        default:
            return state;
    }
}

export const customStyleMenu = (state=DEFAULT_CUSTOM_STYLE_MENU, action) => {
    switch(action.type){
        case OPEN_CUSTOM_STYLE_MENU:
            return (Object.assign({}, state,
                {isOpen: true}));

        case CLOSE_CUSTOM_STYLE_MENU:
            return (Object.assign({}, state,
                {isOpen: false}));

        case CHANGE_CUSTOM_STYLE_MENU_TAB:
            return(Object.assign({}, state,
                {currentTab: action.nextTab}));

        case SELECT_CUSTOM_STYLE_DATASET:
            return Object.assign({}, state, {
                selectedDataset: action.selectedDataset
            });

        case SELECT_CUSTOM_STYLE_FIELD:
            return Object.assign({}, state, {
                selectedField: action.selectedField
            });

        case UPDATE_CUSTOM_STYLE_AVAILABLE_DATASETS:
            return Object.assign({}, state, {
                availableDatasets: action.availableDatasets
            });

        case UPDATE_CUSTOM_STYLE_AVAILABLE_FIELDS:
            return Object.assign({}, state, {
                availableFields: action.availableFields
            });

        case UPDATE_CUSTOM_STYLE_STYLE_INFO:
            return Object.assign({}, state, {
                styleInfo: action.styleInfo
            });
        case UPDATE_CUSTOM_STYLE_SUBMENU_STATE:
            return Object.assign({}, state, {
                submenuStates: Object.assign({}, state.submenuStates,
                    {[action.submenu]: action.submenuState})
            });
        case UPDATE_CUSTOM_STYLE_LAYER_NAME:
            return Object.assign({}, state, {
                layerName: action.layerName
        });
        default:
            return state;
    }
}
