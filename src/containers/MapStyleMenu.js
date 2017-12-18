import React, {Component} from 'react';
import {connect} from 'react-redux'

/* Material UI Components */

import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'


import Slide from 'material-ui/transitions/Slide'

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
    closeCustomStyleMenu, selectCustomStyleDataset, selectCustomStyleDatasetAndUpdateFields, selectCustomStyleField,
    updateCustomStyleAvailableDataSource, updateCustomStyleLayerName,
    updateCustomStyleStyleInfo,
    updateCustomStyleSubmenuState
} from "../actions/layerEditorActions";

import StyleMenuHeader from "../components/map/StyleMenuHeader";

const style = {
    dialog: {},
    content: {
        paddingTop: '16px'
    }
};

class MapStyleMenu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const {updateDataSource, currentTab} = this.props;
        updateDataSource(currentTab)

    }

    render() {
        const {
            // state
            isOpen,
            mode,
            currentTab,
            selectedDataset,
            selectedField,
            availableDatasets,
            availableFields,
            submenuStates,
            layerName,

            handleRequestClose,
            handleTabChange,
            handleDatasourceChange,
            handleUpdateStyleInfo,
            updateSubmenuState,
            updateLayerName,
            handleSubmit
        } = this.props;

        return (
            <Dialog
                transition={Slide}
                style={style.dialog}
                open={isOpen}
                onRequestClose={handleRequestClose}>

                <StyleMenuHeader currentTab={currentTab} onChange={handleTabChange}>
                    <DialogTitle>Add Style to the Map</DialogTitle>
                </StyleMenuHeader>


                <DialogContent style={style.content}>
                    <DatasetFieldSelectionGroup currentDataset={selectedDataset} currentField={selectedField}
                                                handleChange={handleDatasourceChange}
                                                availableDatasets={availableDatasets}
                                                availableFields={availableFields}
                    />
                    <br/>

                    {currentTab === 'category' &&
                    < CategoryStyleMenu dataset={selectedDataset}
                                        field={selectedField}
                                        handleStyleInfoChange={handleUpdateStyleInfo}
                                        updateSavedState={updateSubmenuState('category')}
                                        savedState={submenuStates.category}
                    />}


                    {/*{currentTab === 'choropleth' &&*/}
                    {/*<ChoroplethStyleMenu*/}
                    {/*dataset={dataset}*/}
                    {/*field={field}*/}
                    {/*handleStyleInfoChange={updateStyleInfo}*/}
                    {/*updateSavedState={updateSubmenuSavedState('choropleth')}*/}
                    {/*savedState={submenu ? submenu.choropleth : {}}*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*{currentTab === 'range' &&*/}
                    {/*<RangeStyleMenu*/}
                    {/*dataset={dataset}*/}
                    {/*field={field}*/}
                    {/*handleStyleInfoChange={updateStyleInfo}*/}
                    {/*updateSavedState={updateSubmenuSavedState('range')}*/}
                    {/*savedState={submenu ? submenu.range : {}}*/}
                    {/*/>*/}
                    {/*}*/}
                </DialogContent>

                <DialogActions>
                    <TextField
                        id="layerNameField"
                        label="Layer Name (optional)"
                        value={layerName}
                        placeholder="My Style Name"
                        onChange={updateLayerName}
                        margin="dense"
                    />
                    <Button color="accent" onClick={handleRequestClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit()}>
                        Put Some Style on It!
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    const {
        isOpen,
        currentTab,
        selectedDataset,
        selectedField,
        availableDatasets,
        availableFields,
        submenuStates,
        layerName,
    } = state.customStyleMenu;

    return {
        isOpen,
        currentTab,
        selectedDataset,
        selectedField,
        availableDatasets,
        availableFields,
        submenuStates,
        layerName
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleRequestClose: () => {
            dispatch(closeCustomStyleMenu())

        },
        handleTabChange: (event, value) => {
            const nextTab = value;
            dispatch(changeCustomStyleMenuTab(nextTab))
            dispatch(updateCustomStyleAvailableDataSource(nextTab))
        },
        handleDatasourceChange: (changedItem, selectedDataset) => (event) => {
            const value = event.target.value;
            switch (changedItem) {
                case 'dataset':
                    dispatch(selectCustomStyleDatasetAndUpdateFields(value));
                    break;
                case 'field':
                    dispatch(selectCustomStyleField(selectedDataset.id, value));
                    break;

            }
        },
        handleUpdateStyleInfo: styleInfo => {
            dispatch(updateCustomStyleStyleInfo(styleInfo));
        },
        updateSubmenuState: (submenu) => (state) => {
            dispatch(updateCustomStyleSubmenuState(submenu, state))
        },
        updateDataSource: (styleMode) => {
            dispatch(updateCustomStyleAvailableDataSource(styleMode));
        },
        updateLayerName: event => {
            dispatch(updateCustomStyleLayerName(event.target.value))
        },
        handleSubmit: () => {
            // load current menu state into
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MapStyleMenu);