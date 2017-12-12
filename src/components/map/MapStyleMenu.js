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
import CategoryStyleMenu from './styleMenus/CategoryStyleMenu';
import ChoroplethStyleMenu from './styleMenus/ChoroplethStyleMenu';
import RangeStyleMenu from './styleMenus/RangeStyleMenu';

/* Custom Components */
import DatasetFieldSelectionGroup from './DatasetFieldSelectionGroup'

/* Functions */
import {dataSource} from "../../utils/mapDefaults";
import {getFieldValues} from '../../utils/mapUtils';
import {arraysAreDifferent, COLORS} from "../../utils/dataUtils";
import {addStyleLayer, updateStyleLayer} from "../../actions/styleMenuActions";

import {STYLE_MENU_MODES} from "../../utils/mapDefaults";

const style = {
    dialog: {},
    content: {
        paddingTop: '16px'
    }
};


class MapStyleMenu extends Component {
    /**
     * Menu used to add custom style layer to map.
     *
     * @param props - open: is this dialog open;
     *                handleRequestClose: run when closing dialog
     *                updateStyleLayer: function that updates the attached CartoMapLayer
     */
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'category',
            geometry: 'parcel_boundary',    // currently not used

            dataset: null,                  // Carto dataset
            field: null,                    // field in carto dataset
            fieldValues: null,              // possible values of field in carto dataset

            availableDatasets: [],          // for menus
            availableFields: [],            // available fields for state.dataset, for menus

            styleInfo: {sql: '', css: ''},  // SQL and CSS that define a carto style - is lifted up to map on submit
            layerName: '',
            colorMode: 'fill',
            submenuState: null,
        };

    }


    /**
     * Update State with available datasets
     * @private
     */
    _getAvailableDatasets = () => {
        const styleType = this.state.currentTab;
        let availableDatasets = dataSource.getDatasets();

        // Filter out datasets that have no fields that accommodate the style type
        switch (styleType) {
            case 'category':
                availableDatasets = availableDatasets.filter((dataset) =>
                    dataSource.accommodatesType(dataset.id, 'category'));
                break;
            case 'choropleth':
            case 'range':
                availableDatasets = availableDatasets.filter((dataset) =>
                    dataSource.accommodatesType(dataset.id, 'numeric'));
                break;
        }
        availableDatasets.sort();
        let defaultDataset = availableDatasets[0];

        this.setState(
            {
                availableDatasets: availableDatasets,
                dataset: defaultDataset,
            },
            // Proceed to get the available fields for the default dataset
            this._getAvailableFields(defaultDataset));
    };

    /**
     * Update State with available fields from `dataset`
     * @param {obj} dataset - carto dataset
     * @private
     */
    _getAvailableFields = dataset => {
        const styleType = this.state.currentTab;
        let fields = [],
            currentField = null;

        // Filter fields based on style method
        switch (styleType) {
            case 'category':
                fields = dataset.fields.filter((field) => field.type === 'category');
                break;
            case 'choropleth':
            case 'range':
                fields = dataset.fields.filter((field) => field.type === 'numeric');
                break;
            default:
                fields = dataset.fields;
        }

        fields.sort()
        // Currently just using the first field as the default one.
        currentField = fields[0];

        this.setState(
            {
                availableFields: fields,
                field: currentField,
            },
            // Now that there's a new field, get the possible values from it using `_getFieldValues`
            // which will also save those values to the state.
            () => this._getFieldValues(dataset, currentField)
        )
    };

    /**
     * Collects possible values for `field` of Carto `dataset` adds them to the state.
     * @param {string} dataset - id of carto dataset
     * @param {string} field - name of field in `dataset`
     * @private
     */
    _getFieldValues = (dataset, field) => {
        getFieldValues(dataset, field, this.state.currentTab)
            .then((newOptions) => {
                    newOptions.sort();
                    this.setState({fieldValues: newOptions})
                },
                (err) => {
                    console.log(err)
                })
    };


    /**
     * Updates the saved state of submenu.
     * @param submenuState - current state of submenu
     */
    updateSubmenuSavedState = submenuState => {
        this.setState({submenuState: submenuState})
    };


    /**
     * When tab is clicked, change it in state, and update available Selects.
     * @param e
     * @param value
     */
    handleTabChange = (e, value) => {
        this.setState(
            {currentTab: value},

            // Since some fields are only applicable for certain style methods
            // (e.g. strings only for 'category'; impractical to use numbers for 'category')
            // and some datasets might not have any of said applicable fields, we need to reconfigure
            // what datasets and fields and fieldValues are available
            () => {
                this._getAvailableDatasets()
            }
        )
    };


    /**
     * Runs when data source (dataset, field) dropdowns are changed.
     * @param name
     */
    handleDataSourceMenuChange = name => event => {
        if (name === 'dataset') {
            // Update dataset
            let newDataset = dataSource.getDataset(event.target.value);
            this.setState(
                {dataset: newDataset},
                () => {
                    // And then get new available the fields,
                    // which will also set the currently-selected field and it's possible values.
                    this._getAvailableFields(newDataset)
                }
            );

        }
        else if (name === 'field') {
            // Get new field
            let newField = dataSource.getField(this.state.dataset.id, event.target.value);

            // Update field in state
            this.setState(
                {field: newField},
                //And then get available values for that field,
                // which will also set the possible values
                () => {
                    this._getFieldValues(this.state.dataset, this.state.field)
                }
            );
        }

    };


    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    };

    /**
     * Passed to children components that provide menus to define the style.
     * They, in turn, use this function to update this component's `styleInfo` state.
     * NOTE: SQL and CSS state is kept in this component and not children, since this component
     * has the style submission button.  Children components are just for defining sql and css.
     * @param sql
     * @param css
     */
    handleStyleInfoChange = (sql, css) => {
        this.setState({styleInfo: {sql: sql, css: css}})
    };


    /**
     * Runs when submit button is clicked. Lifts the entire state of this layer to the layer menu to
     * be processed and further lifted to the InterfaceMap for rendering.
     */
    handleSubmit = () => {
        const {ADD, UPDATE} = STYLE_MENU_MODES;
        const {addStyleLayer, updateStyleLayer, mode, layerIndex} = this.props;
        const {styleInfo} = this.state;

        // Send state up to menu
        let savedState = Object.assign({}, this.state);
        delete savedState.styleInfo;

        // We currently pass the entire state of this menu into the store.  This way we can repopulate this menu when
        // modifying a previously-made layer. We can also display some of the metadata on the menu.
        switch (mode) {
            case ADD:
                console.log(savedState, styleInfo)
                addStyleLayer('STYLE_LAYER', savedState, styleInfo);
                break;
            case UPDATE:
                updateStyleLayer(layerIndex, savedState, styleInfo);
                break;
            default:
                throw RangeError(`${mode} is not a valid mode for updating styles`)
        }
        this.props.handleRequestClose();
    };


    /**
     *  Runs when props or state change.  Decides if ...update or render methods should run
     *
     * @param nextProps - next set of props
     * @param nextState - next state
     * @return {boolean} True if there's been a change, false if not
     */
    shouldComponentUpdate = (nextProps, nextState) => {
        // This is the only prop that matters for now.  The methods passed as props don't change
        if (this.props.open !== nextProps.open) {
            return true
        }
        if (this.state.layerName !== nextState.layerName) {
            return true;
        }

        if (this.state.colorMode !== nextState.colorMode) {
            return true;
        }


        else if (this.state.dataset !== nextState.dataset || this.state.field !== nextState.field ||
            arraysAreDifferent(this.state.fieldValues, nextState.fieldValues)) {
            return true
        } else if (this.state.currentTab !== nextState.currentTab) {
            return true;
        }
        return false
    };


    /**
     *  Runs before new props are processed.
     * @param nextProps
     */
    componentWillReceiveProps = nextProps => {
        // Check if a saved state was provided (for updating a previously-made layer)
        if (nextProps.savedState) {
            this.setState(Object.assign({}, nextProps.savedState, {styleInfo: nextProps.styleInfo}));
        }
    };

    /**
     * When the component mounts, get the datasets, which then gets the fields,
     * which in turn gets the possible values for said field in said dataset.
     */
    componentDidMount() {
        this._getAvailableDatasets();
    }


    render() {
        const {
            open,
            handleRequestClose
        } = this.props;
        const {
            currentTab,
            dataset,
            field,
            availableDatasets,
            availableFields,
            fieldValues,
            submenuState,
            layerName
        } = this.state;

        return (
            <Dialog
                transition={Slide}
                style={style.dialog}
                open={open}
                onRequestClose={handleRequestClose}>

                <AppBar position="static" color="default">
                    <DialogTitle>Add Style to the Map</DialogTitle>
                    <Tabs fullWidth
                          value={currentTab}
                          onChange={this.handleTabChange}
                          indicatorColor="primary" textColor="primary"
                    >
                        <Tab value="category" label="Category"/>
                        <Tab value="choropleth" label="Choropleth"/>
                        <Tab value="range" label="Range"/>
                    </Tabs>
                </AppBar>


                <DialogContent style={style.content}>
                    <DatasetFieldSelectionGroup currentDataset={dataset} currentField={field}
                                                handleChange={this.handleDataSourceMenuChange}
                                                availableDatasets={availableDatasets}
                                                availableFields={availableFields}
                    />
                    <br/>
                    {currentTab === 'category' &&
                    < CategoryStyleMenu dataset={dataset}
                                        field={field}
                                        fieldValues={fieldValues}
                                        handleStyleInfoChange={this.handleStyleInfoChange}
                                        updateSavedState={this.updateSubmenuSavedState}
                                        savedState={submenuState}
                    />}
                    {currentTab === 'choropleth' &&
                    <ChoroplethStyleMenu
                        dataset={dataset}
                        field={field}
                        handleStyleInfoChange={this.handleStyleInfoChange}
                        updateSavedState={this.updateSubmenuSavedState}
                        savedState={submenuState}
                    />
                    }
                    {currentTab === 'range' &&
                    <RangeStyleMenu
                        dataset={dataset}
                        field={field}
                        handleStyleInfoChange={this.handleStyleInfoChange}
                        updateSavedState={this.updateSubmenuSavedState}
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
                        onChange={this.handleChange('layerName')}
                        margin="dense"
                    />
                    <Button color="accent" onClick={handleRequestClose}>Cancel</Button>
                    <Button color="primary" onClick={this.handleSubmit}>Put Some Style on It!</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        addStyleLayer: (layerType, menuState, styleInfo) => {
            dispatch(addStyleLayer(layerType, menuState, styleInfo))
        },
        updateStyleLayer: (index, menuState, styleInfo) => {
            dispatch(updateStyleLayer(index, menuState, styleInfo))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MapStyleMenu);