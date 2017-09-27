import React, {Component} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

/* Material UI Components 0*/
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Dialog, {DialogTitle, DialogContent} from 'material-ui/Dialog';
import Menu, {MenuItem} from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';

/* Icons */
import Layers from 'material-ui-icons/Layers';
import FormatPaint from 'material-ui-icons/FormatPaint';
import {default as MapIcon} from 'material-ui-icons/Map';

/* Functions */
import {getCartoTiles, getParcel} from './mapUtils';
import {BASEMAPS, STYLE_DATASETS} from './mapDefaults'
import {mapDatasets} from "../containers/mapDefaults";

const colors = ['red', 'blue', 'green'];

class MapStyleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'category',
            dataset: 'assessment',
            field: 'stuff',
            open: false
        };
        this.handleOpenClick = this.handleOpenClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
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

    render() {
        const style = {
            content: {
                paddingTop: '16px'
            }
        };

        let availableFields = mapDatasets[this.state.dataset].fields;
        if (this.state.tab === 'category') {
            availableFields = availableFields.filter(field => field.type === 'category')
        } else {
            availableFields = availableFields.filter(field => field.type !== 'category')
        }


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

                        <form>
                            {/* Dataset Select */}
                            <FormControl>
                                <InputLabel htmlFor="age-native-simple">Dataset</InputLabel>
                                <Select
                                    native
                                    value={this.state.dataset}
                                    onChange={this.handleChange('dataset')}
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
                                    value={this.state.field}
                                    onChange={this.handleChange('field')}
                                    input={<Input id="field"/>}
                                >
                                    {availableFields.map((field, i) => {
                                        return <option key={i.toString()} value={field.id}>{field.name}</option>
                                    })}
                                </Select>
                            </FormControl>
                        </form>
                        {this.state.tab === 'category' &&
                        <CategoryStyleForm dataset={this.state.dataset} field={this.state.field}
                                           updateStyleLayer={this.props.updateStyleLayer}
                                           categoryOptions={['stuff', 'things', 'doohickeys']}
                                           colorOptions={['blue', 'red', 'green']}/>}
                        {this.state.tab === 'choropleth' && 'Choropleth'}
                        {this.state.tab === 'range' && 'Range'}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


class CategoryStyleForm extends Component {
    /**
     *
     *
     * @param {obj} props - react props
     **/
    constructor(props) {
        super(props);
        this.state = {
            items: [{category: '', color: 'blue'}]
        };

        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleItemChange = (name, i) => (e) => {
        const newItems = this.state.items.map((item, j) => {
            if (i !== j)
                return item;  // other items
            else
                return {...item, [name]: e.target.value}  // target item
        });

        this.setState({items: newItems})
    };


    handleAddItem = () => {
        this.setState({
            items: this.state.items.concat([{category: '', color: '#FFF'}])
        })
    };

    handleRemoveItem = (i) => () => {
        this.setState({
            items: this.state.items.filter((item, j) => i !== j)
        })
    };

    handleSubmit = () => {
        const dataset = this.props.dataset;
        const field = this.props.field;
        const mapDataset = mapDatasets[dataset];

        // Base css for category styling
        let css = `${mapDataset.cartoCssId}{
                polygon-opacity: 0.0;  
                line-color: #000;  line-opacity: 1;
                line-width: .5; [zoom < 15]{line-width: 0;} 
                }`;

        // Add conditional css for each category-color combo entered
        // TODO: get good values for this
        this.state.items.map((item) => {
            css += `[ ${field} = "${item.category}" ]{ polygon-opacity: 1.0; polygon-fill: ${item.color};}`;
        });
        console.log(css);
        this.props.updateStyleLayer(css)
        // Send style back up to the map controller to request the new layer, son.

    };


    render() {
        console.log("MAP STYLE PROPS:", this.props);
        const categoryOptions = this.props.categoryOptions;
        const colorOptions = this.props.colorOptions;

        return (
            <form>
                <List>

                    {this.state.items.map((item, itemIdx) => (
                        <ListItem key={itemIdx.toString()}>
                            {console.log(this.state.items)}
                            {/* Category */}
                            <Select native value={item.category}
                                    onChange={this.handleItemChange('category', itemIdx)}
                                    input={<Input id={`category-value-${itemIdx}`}/>}
                            >
                                {categoryOptions.map((opt, optionIdx) => (
                                    <option key={optionIdx.toString()}
                                            value={categoryOptions[optionIdx]}>{categoryOptions[optionIdx]}
                                    </option>
                                ))}
                            </Select>
                            {/* Color */}
                            <Select native value={item.color}
                                    onChange={this.handleItemChange('color', itemIdx)}
                                    input={<Input id={`color-value-${itemIdx}`}/>}
                            >
                                {colorOptions.map((opt, optionIdx) => (
                                    <option key={optionIdx.toString()}
                                            value={[optionIdx]}>{colorOptions[optionIdx]}
                                    </option>
                                ))}
                            </Select>
                            <Button onClick={this.handleRemoveItem(itemIdx)}>Remove Me</Button>
                        </ListItem>
                    ))}
                    <ListItem><Button onClick={this.handleAddItem}>Add another!</Button></ListItem>
                </List>
                <Button raised onClick={this.handleSubmit} color="primary">Put Some Style on It!</Button>
            </form>
        );
    }
}

/**
 *
 * @param dataset
 * @param field
 */
let getFieldValues = (dataset, field) => {
    return new Promise((resolve, reject) => {
    })
};

export default MapStyleMenu;

