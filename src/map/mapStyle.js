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
import CategoryStyleMenu from './styleMenus/CategoryStyleMenu';

/* Icons */
import {default as MapIcon} from 'material-ui-icons/Map';

/* Functions */
import {mapDatasets} from "./mapDefaults";

const COLORS = ['red', 'blue', 'green'];
const DEFAULT_DATASET = Object.keys(mapDatasets)[0];

class MapStyleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'category',
            dataset: this.props.dataset,
            field: this.props.field,
            open: false,
            availableFields: []
        };
        this.handleOpenClick = this.handleOpenClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this._setFields = this._setFields.bind(this);
    }

    _setFields() {
        let availableFields = mapDatasets[this.state.dataset].fields;
        if (this.state.tab === 'category') {
            availableFields = availableFields.filter(field => field.type === 'category')
        } else {
            availableFields = availableFields.filter(field => field.type !== 'category')
        }
        this.setState({availableFields: availableFields, field: availableFields[0].id})
    }

    handleOpenClick = event => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false})
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleTabChange = (event, value) => {
        this.setState({tab: value})
    };

    componentWillMount() {
        this._setFields();
    }



    render() {
        const style = {
            content: {
                paddingTop: '16px'
            }
        };

        return (
            <div>
                <Button raised onClick={this.handleOpenClick}>
                    <MapIcon/> Style
                </Button>
                <Dialog style={style.dialog}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}>

                    <AppBar position="static" color="default">
                        <DialogTitle>Add Style to the Map</DialogTitle>
                        <Tabs
                            value={this.state.tab}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab value="category" label="Category"/>
                            <Tab value="choropleth" label="Choropleth"/>
                            <Tab value="range" label="Range"/>
                        </Tabs>
                    </AppBar>
                    <DialogContent style={style.content}>
                        {/* Dataset and Field Selection*/}
                        <DatasetFieldSelectionGroup dataset={this.state.dataset} field={this.state.filed}
                                                    handleChange={this.handleChange}
                                                    availableFields={this.state.availableFields}
                        />

                        {/* Style Method Selections*/}
                        {this.state.tab === 'category' &&
                        <CategoryStyleMenu datasetName={this.state.dataset} fieldName={this.state.field}
                                           savedState={this.props.savedStates.category} saveMenuState={this.props.saveMenuState}
                                           updateStyleLayer={this.props.updateStyleLayer} colorOptions={COLORS}/>}
                        {this.state.tab === 'choropleth' && 'Choropleth'}
                        {this.state.tab === 'range' && 'Range'}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


function DatasetFieldSelectionGroup(props) {
    return (
        <form>
            {/* Dataset Select */}
            <FormControl>
                <InputLabel htmlFor="age-native-simple">Dataset</InputLabel>
                <Select
                    native
                    value={props.dataset}
                    onChange={props.handleChange('dataset')}
                    input={<Input id="dataset"/>}
                >
                    {Object.keys(mapDatasets).map((dataset, i) => {
                        return <option key={i.toString()}
                                       value={dataset}>{mapDatasets[dataset].title}</option>
                    })}
                </Select>
            </FormControl>

            {/* Field Select */}
            <FormControl>
                <InputLabel htmlFor="age-native-simple">Field</InputLabel>
                <Select
                    native
                    value={props.field}
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
}


export default MapStyleMenu;

