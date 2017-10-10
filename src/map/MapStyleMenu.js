import React, {Component} from 'react';

/* Material UI Components 0*/
import Button from 'material-ui/Button'
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';


/* Style Menus */
import CategoryStyleMenu from './styleMenus/CategoryStyleMenu';
import ChoroplethStyleMenu from './styleMenus/ChoroplethStyleMenu';
import RangeStyleMenu from './styleMenus/RangeStyleMenu';
/* Icons */
import {default as MapIcon} from 'material-ui-icons/Map';

/* Functions */
import {mapDataSource} from "./mapDefaults";
import {getFieldValues} from './mapUtils';
import {arraysAreDifferent, COLORS} from "../utils/dataUtils";

/**
 * Form Group with dataset and field options
 *
 * @param props
 * @return {XML}
 * @constructor
 */
function DatasetFieldSelectionGroup(props) {
    if (props.currentDataset && props.currentField) {
        return (
            <form>
                <FormControl>
                    <InputLabel htmlFor="dataset">Dataset</InputLabel>
                    <Select
                        native
                        value={props.currentDataset.id}
                        onChange={props.handleChange('dataset')}
                        input={<Input id="dataset"/>}
                    >
                        {props.availableDatasets.map((dataset, i) => {
                            return <option key={i.toString()}
                                           value={dataset.id}>{dataset.name}</option>
                        })}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="field">Field</InputLabel>
                    <Select
                        native
                        value={props.currentField.id}
                        onChange={props.handleChange('field')}
                        input={<Input id="field"/>}
                    >
                        {props.availableFields.map((field, i) => {
                            return <option key={i.toString()} value={field.id}>{field.name}</option>
                        })}
                    </Select>
                </FormControl>
            </form>
        );
    } else {
        return <form/>;
    }
}


class MapStyleMenu extends Component {
    /**
     * Menu used to add custom style layer to map.
     *
     * @param props - open: is this dialog open;
     *                handleRequestClose: run when closing dialog
     *                updateStyleLayer: function that updates the attached CartoLayer
     */
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'category',
            geometry: 'parcel_boundary',
            dataset: null,          // Carto dataset
            field: null,            // field in carto dataset
            fieldValues: null,      // possible values of field in carto dataset
            availableDatasets: [],
            availableFields: [],
            styleInfo: {sql: '', css: ''}   // SQL and CSS that define a carto style - is lifted up to map on submit
        };

        this.handleDataSourceMenuChange = this.handleDataSourceMenuChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this._getAvailableDatasets = this._getAvailableDatasets.bind(this);
        this._getAvailableFields = this._getAvailableFields.bind(this);
    }


    /**
     * Update State with available datasets
     * @private
     */
    _getAvailableDatasets() {
        const styleType = this.state.currentTab;
        let availableDatasets = mapDataSource.getDatasets();

        // Filter out datasets that have no fields that accommodate the style type
        switch (styleType) {
            case 'category':
                availableDatasets = availableDatasets.filter((dataset) => mapDataSource.accommodatesType(dataset.id, 'category'));
                break;
            case 'choropleth':
            case 'range':
                availableDatasets = availableDatasets.filter((dataset) => mapDataSource.accommodatesType(dataset.id, 'numeric'));
                break;
        }
        let defaultDataset = availableDatasets[0];

        this.setState(
            {
                availableDatasets: availableDatasets,
                dataset: defaultDataset,
            },
            // Proceed to get the available fields for the default dataset
            this._getAvailableFields(defaultDataset));
    }

    /**
     * Update State with available fields from `dataset`
     * @param {obj} dataset - carto dataset
     * @private
     */
    _getAvailableFields(dataset) {
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
    }

    /**
     * Collects possible values for `field` of Carto `dataset` adds them to the state.
     * @param {string} dataset - id of carto dataset
     * @param {string} field - name of field in `dataset`
     * @private
     */
    _getFieldValues = (dataset, field) => {
        getFieldValues(dataset.cartoTable, field.id, this.state.currentTab)
            .then((newOptions) => {
                    this.setState({fieldValues: newOptions})
                },
                (err) => {
                    console.log(err)
                })
    };


    /**
     * When tab is clicked, change it in state, and update available Selects.
     * @param e
     * @param value
     */
    handleTabChange(e, value) {
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
            let newDataset = mapDataSource.getDataset(event.target.value);
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
            let newField = mapDataSource.getField(this.state.dataset.id, event.target.value);

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
     * be processed and further lifted to the Map for rendering.
     */
    handleSubmit = () => {
        // Send state up to menu
        let savedState = this.state;
        // We currently pass the entire state back up to the menu.  This way we can repopulate this menu when
        // modifying a previously-made layer. We can also display some of the metadata on the menu.
        this.props.updateStyleLayer(savedState);
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
        else if(this.props.savedState !== nextProps.savedState){
            return true
        }


        else if(this.state.dataset !== nextState.dataset || this.state.field !== nextState.field ||
            arraysAreDifferent(this.state.fieldValues, nextState.fieldValues)) {
            return true
        } else if( this.state.currentTab !== nextState.currentTab) {
            return true;
        }
        return false
    };


    /**
     *  Runs before new props are processed.
     * @param nextProps
     */
    componentWillReceiveProps = nextProps => {
        console.log('nextProps', nextProps);
        // Check if a saved state was provided (for updating a previously-made layer)
        if(nextProps.savedState){
            this.setState(this.props.savedState)
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
        const style = {
            dialog: {},
            content: {
                paddingTop: '16px'
            }
        };

        const currentTab = this.state.currentTab;

        return (
            <Dialog style={style.dialog}
                    open={this.props.open}
                    onRequestClose={this.props.handleRequestClose}>

                <AppBar position="static" color="default">
                    <DialogTitle>Add Style to the Map</DialogTitle>
                    <Tabs fullWidth
                          value={this.state.currentTab}
                          onChange={this.handleTabChange}
                          indicatorColor="primary" textColor="primary"
                    >
                        <Tab value="category" label="Category"/>
                        <Tab value="choropleth" label="Choropleth"/>
                        <Tab value="range" label="Range"/>
                    </Tabs>
                </AppBar>


                <DialogContent style={style.content}>
                    <DatasetFieldSelectionGroup currentDataset={this.state.dataset} currentField={this.state.field}
                                                handleChange={this.handleDataSourceMenuChange}
                                                availableDatasets={this.state.availableDatasets}
                                                availableFields={this.state.availableFields}
                    />
                    <br/>
                    {currentTab === 'category' &&
                    < CategoryStyleMenu dataset={this.state.dataset}
                                        field={this.state.field}
                                        fieldValues={this.state.fieldValues}
                                        handleStyleInfoChange={this.handleStyleInfoChange}
                    />}
                    {currentTab === 'choropleth' &&
                    <ChoroplethStyleMenu
                        dataset={this.state.dataset}
                        field={this.state.field}
                        handleStyleInfoChange={this.handleStyleInfoChange}
                    />
                    }
                    {currentTab === 'range' &&
                    <RangeStyleMenu
                        dataset={this.state.dataset}
                        field={this.state.field}
                        handleStyleInfoChange={this.handleStyleInfoChange}
                    />
                    }
                </DialogContent>

                <DialogActions>
                    <Button color="accent" onClick={this.props.handleRequestClose}>Cancel</Button>
                    <Button color="primary" onClick={this.handleSubmit}>Put Some Style on It!</Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default MapStyleMenu;