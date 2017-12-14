import React, {Component} from 'react';
import {connect} from 'react-redux'

/* Material UI Components */
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Slide from 'material-ui/transitions/Slide'

/* Material UI Icons */
import {default as MapIcon} from 'material-ui-icons/Map';

/* Style Menus */
import CategoryStyleMenu from '../components/map/styleMenus/CategoryStyleMenu';
import ChoroplethStyleMenu from '../components/map/styleMenus/ChoroplethStyleMenu';
import RangeStyleMenu from '../components/map/styleMenus/RangeStyleMenu';

/* Custom Components */
import DatasetFieldSelectionGroup from '../components/map/DatasetFieldSelectionGroup'

/* Functions */
import {DataSource, dataSource, LayerTypes} from "../utils/mapDefaults";
import {arraysAreDifferent, COLORS} from "../utils/dataUtils";
import {addStyleLayer, updateStyleLayer} from "../actions/styleMenuActions";

import {StyleMenuEditModes} from "../utils/mapDefaults";
import {
    changeCustomStyleMenuTab,
    closeCustomStyleMenu, selectCustomStyleDataset, selectCustomStyleField,
    updateCustomStyleInfo,
    updateCustomStyleLayerName, updateCustomStyleSubmenu
} from "../actions/index";
import {
    fetchCustomStyleAvailableValues, updateAvailableDatasetsAndFields, updateAvailableFields,
    updateCustomStyleAvailableValues
} from "../actions";

const style = {
    dialog: {},
    content: {
        paddingTop: '16px'
    }
};


class MapStyleMenu extends Component {

    componentWillUpdate = nextProps => {
        const oldCurrentTab = this.props.currentTab;
        const {availableDatasets, currentTab, initializeMenus} = nextProps;
        if (!availableDatasets || oldCurrentTab !== currentTab) {
            initializeMenus(currentTab);
        }
    }

    render() {
        const {
            // state
            isOpen,
            mode,
            layerIndex,
            styleInfo,
            currentTab,
            selectedDataset,
            selectedField,
            availableDatasets,
            availableFields,
            layerName,
            colorMode,
            submenuState,
            // dispatch
            handleRequestClose,
            handleSubmit,
            updateStyleInfo,
            updateLayerName,
            handleTabChange,
            handleDataSourceMenuChange,
            updateSubmenuSavedState
        } = this.props;

        if (!selectedDataset) {
            return null;
        }
        // get dataset and field objects todo: use IDs until necessary
        const dataset = selectedDataset;
        const field = selectedField;
        console.log(dataset, field);

        return (
            <Dialog
                transition={Slide}
                style={style.dialog}
                open={isOpen}
                onRequestClose={handleRequestClose}>

                <AppBar position="static" color="default">
                    <DialogTitle>Add Style to the Map</DialogTitle>
                    <Tabs fullWidth
                          value={currentTab}
                          onChange={handleTabChange}
                          indicatorColor="primary" textColor="primary"
                    >
                        <Tab value="category" label="Category"/>
                        <Tab value="choropleth" label="Choropleth"/>
                        <Tab value="range" label="Range"/>
                    </Tabs>
                </AppBar>


                <DialogContent style={style.content}>
                    <DatasetFieldSelectionGroup currentDataset={dataset} currentField={field}
                                                handleChange={handleDataSourceMenuChange(currentTab, selectedDataset)}
                                                availableDatasets={availableDatasets}
                                                availableFields={availableFields}
                    />
                    <br/>
                    {currentTab === 'category' &&
                    < CategoryStyleMenu dataset={dataset}
                                        field={field}
                                        handleStyleInfoChange={updateStyleInfo}
                                        updateSavedState={updateSubmenuSavedState}
                                        savedState={submenuState}
                    />}



                    {currentTab === 'choropleth' &&
                    <ChoroplethStyleMenu
                        dataset={dataset}
                        field={field}
                        handleStyleInfoChange={updateStyleInfo}
                        updateSavedState={updateSubmenuSavedState}
                        savedState={submenuState}
                    />
                    }
                    {currentTab === 'range' &&
                    <RangeStyleMenu
                        dataset={dataset}
                        field={field}
                        handleStyleInfoChange={updateStyleInfo}
                        updateSavedState={updateSubmenuSavedState}
                        savedState={submenuState}
                    />
                    }
                </DialogContent>

                <DialogActions>
                    <TextField
                        id="layerNameField"
                        label="Layer Name (optional)"
                        value={layerName}
                        placeholder="My Style Name"
                        onChange={updateLayerName(layerName)}
                        margin="dense"
                    />
                    <Button color="accent" onClick={handleRequestClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit(mode, layerIndex, this.props, styleInfo)}>
                        Put Some Style on It!
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    const {
        isOpen,
        mode,
        layerIndex,
        styleInfo,
        currentTab,
        selectedDataset,
        selectedField,
        selectedValue,
        availableDatasets,
        availableFields,
        availableValues,
        layerName,
        colorMode,
        submenuState,
    } = state.styleMenu;
    return {
        isOpen,
        mode,
        layerIndex,
        styleInfo,
        currentTab,
        selectedDataset,
        selectedField,
        selectedValue,
        availableDatasets,
        availableFields,
        availableValues,
        layerName,
        colorMode,
        submenuState,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleRequestClose: () => {
            dispatch(closeCustomStyleMenu());
        },
        handleSubmit: (mode, layerIndex, currentState, styleInfo) => () => {
            // Make a copy of the menu state
            // todo: currently pulling in the props for this which feels kinda hacky - possible other method?
            let savedState = Object.assign({}, currentState);
            delete savedState.styleInfo;

            // We currently pass the entire state of this menu into the store.
            // This way we can repopulate this menu when modifying a previously-made layer.
            // We can also display some of the metadata on the menu.
            switch (mode) {
                case StyleMenuEditModes.ADD:
                    dispatch(addStyleLayer(LayerTypes.CUSTOM, savedState, styleInfo));
                    break;
                case StyleMenuEditModes.UPDATE:
                    dispatch(updateStyleLayer(layerIndex, savedState, styleInfo));
                    break;
                default:
                    throw RangeError(`${mode} is not a valid mode for updating styles`)
            }
            dispatch(closeCustomStyleMenu())
        },
        updateStyleInfo: (sql, css) => {
            dispatch(updateCustomStyleInfo({sql, css}))
        },
        updateLayerName: layerName => () => {
            dispatch(updateCustomStyleLayerName(layerName))
        },
        initializeMenus: styleMode => {
            dispatch(updateAvailableDatasetsAndFields(styleMode))
        },
        handleTabChange: (e, value) => {
            dispatch(changeCustomStyleMenuTab(value));
        },
        handleDataSourceMenuChange: (styleMode, dataset, field) => type => event => {
            switch (type) {
                case 'dataset':
                    dispatch(selectCustomStyleDataset(event.target.value));
                    dispatch(updateAvailableFields(styleMode, dataset));
                    break;
                case 'field':
                    dispatch(selectCustomStyleField(event.target.value));
            }
        },
        updateSubmenuSavedState: submenuState => {
            dispatch(updateCustomStyleSubmenu(submenuState))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MapStyleMenu);