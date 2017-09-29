import React, {Component} from 'react';

/* Material UI Components 0*/
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText} from 'material-ui/List';
import Dialog, {DialogTitle, DialogContent} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';

/* Style Menus */
// import CategoryStyleMenu from './styleMenus/CategoryStyleMenu';

/* Icons */
import {default as MapIcon} from 'material-ui-icons/Map';

/* Functions */
import {mapData} from "./mapDefaults";

const COLORS = ['red', 'blue', 'green'];


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
            // Source Data Information
            dataset: null,
            field: null,
            availableDatasets: [],
            availableFields: [],
        };

        this.handleDataSourceMenuChange = this.handleDataSourceMenuChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this._getAvailableDatasets = this._getAvailableDatasets.bind(this);
        this._getAvailableFields = this._getAvailableFields.bind(this);
    }


    _getAvailableDatasets() {
        let availableDatasets = mapData.getDatasets();
        this.setState({
            availableDatasets: availableDatasets,
            dataset: availableDatasets[0]
        }, this._getAvailableFields);
    }


    _getAvailableFields() {
        const styleType = this.state.currentTab;
        let fields = [];
        let dataset = this.state.dataset;

        if(this.state.dataset){
            if (styleType === 'category') {
                fields = dataset.fields.filter((field) => field.type === 'category')
            } else {
                fields = dataset.fields;
            }
            this.setState({
                availableFields: fields,
                field: fields[0]
            })
        } else{
            this._getAvailableDatasets();
        }
    }


    /**
     * When tab is clicked, adjust the state accordingly
     * @param e
     * @param value
     */
    handleTabChange(e, value) {
        this.setState({currentTab: value})
    };

    handleDataSourceMenuChange = name => event => {
        let value = null;
        if(name === 'dataset'){
            value = mapData.getDataset(event.target.value);
        }
        else if(name === 'field'){
            value = mapData.getField(this.state.dataset.id, event.target.value)
        }
        this.setState({[name]: value})
    };

    // LIFECYCLE METHODS

    componentDidMount() {
        this._getAvailableDatasets();
        this._getAvailableFields();
    }


    render() {
        const style = {
            dialog: {},
            content: {
                paddingTop: '16px'
            }
        };


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
                    {/* Dataset and Field Selection*/}

                    <DatasetFieldSelectionGroup defaultDataset={this.state.dataset} defaultField={this.state.field}
                                                handleChange={this.handleDataSourceMenuChange}
                                                availableDatasets={this.state.availableDatasets}
                                                availableFields={this.state.availableFields}
                    />

                </DialogContent>
            </Dialog>
        );
    }
}


function DatasetFieldSelectionGroup(props) {
    if (props.defaultDataset && props.defaultField) {
        return (
            <form>
                <FormControl>
                <InputLabel htmlFor="dataset">Dataset</InputLabel>
                <Select
                    native
                    value={props.defaultDataset.id}
                    onChange={props.handleChange('dataset')}
                    input={<Input id="dataset"/>}
                >
                    {props.availableDatasets.map((dataset, i) => {
                        return <option key={i.toString()}
                                       value={dataset.id}>{dataset.name}</option>
                    })}
                </Select>
            </FormControl>

                {/* Field Select */}
                <FormControl>
                    <InputLabel htmlFor="field">Field</InputLabel>
                    <Select
                        native
                        value={props.defaultField.id}
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

export default MapStyleMenu;