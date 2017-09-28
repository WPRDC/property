import React, {Component} from 'react';

/* Material UI Components*/
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText} from 'material-ui/List';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';

/* Defaults & Helper Functions */
import {mapDatasets} from "../mapDefaults";
import {getFieldValues, createCategoryCSS, createStyleSQL} from '../mapUtils';

class CategoryStyleMenu extends Component {
    /**
     *
     *
     * @param {obj} props - react props
     **/
    constructor(props) {
        super(props);
        if (this.props.savedState) {
            // Used saved menu state if it was opened before
            this.state = this.props.savedState
        } else {
            //Default state
            this.state = {
                items: [{category: '', color: 'blue'}],
                possibleCategories: [],
                possibleColors: this.props.colorOptions
            };
        }
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    /**
     * Collects possible values from Carto and populates field select with them
     *
     * @param datasetName
     * @param fieldName
     * @private
     */
    _updateFieldChoices(datasetName, fieldName) {
        // Get possible values of the field for populating category dropdown
        const dataset = mapDatasets[datasetName];
        getFieldValues(dataset.cartoTable, fieldName)
            .then(
                (categories) => this.setState({possibleCategories: categories}),
                (err) => console.log(err)
            );
    }

    /*****************
     * EVENT HANDLERS
     *****************/

    /**
     * Runs when category menu item is changed
     * @param name - part (category, color) of menu item that was changed
     * @param i - index of menu item
     */
    handleItemChange = (name, i) => (e) => {
        const newItems = this.state.items.map((item, j) => {
            if (i !== j)
                return item;  // other items
            else
                return {...item, [name]: e.target.value}  // target item
        });

        this.setState({items: newItems})
    };

    /**
     * Runs when new menu item is requested. Adds new menu item to menu.
     */
    handleAddItem = () => {
        this.setState({
            items: this.state.items.concat([{category: '', color: '#FFF'}])
        })
    };

    /**
     * Runs when deletion of menu item is requested. Removes item at index `i` from menu.
     * @param i - index of menu item to be deleted
     */
    handleRemoveItem = (i) => () => {
        this.setState({
            items: this.state.items.filter((item, j) => i !== j)
        })
    };

    /**
     * Generates cartoCSS and pass it to the provided style updating function
     */
    handleSubmit = () => {
        const datasetName = this.props.datasetName;
        const fieldName = this.props.fieldName;
        const mapDataset = mapDatasets[datasetName];
        const parcelIdField = mapDataset.parcelIdField;
        const datasetTable = mapDataset.cartoTable;

        let sql = createStyleSQL(datasetTable, fieldName, parcelIdField);
        let css = createCategoryCSS(datasetName, fieldName, this.state.items);
        // Send style back up to the map controller to request the new layer, son.
        this.props.updateStyleLayer(sql, css)
    };

    /*******************
     * LIFECYLE METHODS
     *******************/

    componentWillMount() {
        this._updateFieldChoices(this.props.datasetName, this.props.fieldName);
    }

    componentWillReceiveProps(newProps) {
        this._updateFieldChoices(newProps.datasetName, newProps.fieldName)
    }

    componentWillUnmount(){
        this.props.saveMenuState('category', this.state);
    }

    /*********
     * RENDER
     *********/
    render() {
        // Save current menu state if it's closed and reopened
        const colorOptions = this.props.colorOptions;

        return (
            <form>
                <List>
                    {this.state.items.map((item, itemIdx) =>
                        <CategorySelectionLine key={itemIdx.toString()}
                                               item={item} itemIdx={itemIdx}
                                               handleItemChange={this.handleItemChange}
                                               handleRemoveItem={this.handleRemoveItem}
                                               categoryOptions={this.state.possibleCategories}
                                               colorOptions={colorOptions}
                        />
                    )}
                    <ListItem><Button onClick={this.handleAddItem}>Add another!</Button></ListItem>
                </List>
                <Button raised onClick={this.handleSubmit} color="primary">Put Some Style on It!</Button>
            </form>
        );
    }
}

/**
 * Line that has a category-color pair for styling the map by category
 *
 * @param props
 * @return {XML} <ListItem> containing <Selects> for category and color
 * @constructor
 */
function CategorySelectionLine(props) {
    const itemIdx = props.itemIdx;
    const item = props.item;
    const categoryOptions = props.categoryOptions;
    const colorOptions = props.colorOptions;
    const handleRemoveItem = props.handleRemoveItem;
    const handleItemChange = props.handleItemChange;
    return (
        <ListItem>
            <Select native value={item.category}
                    onChange={handleItemChange('category', itemIdx)}
                    input={<Input id={'category-value-' + {itemIdx}}/>}
            >
                {categoryOptions.map((opt, optionIdx) => (
                    <option key={optionIdx.toString()}
                            value={categoryOptions[optionIdx]}>{categoryOptions[optionIdx]}
                    </option>
                ))}
            </Select>
            <Select native value={item.color}
                    onChange={handleItemChange('color', itemIdx)}
                    input={<Input id={'color-value-' + {itemIdx}}/>}
            >
                {colorOptions.map((opt, optionIdx) => (
                    <option key={optionIdx.toString()}
                            value={[opt]}>{colorOptions[optionIdx]}
                    </option>
                ))}
            </Select>
            <Button onClick={handleRemoveItem(itemIdx)}>Remove Me</Button>
        </ListItem>
    );
};

export default CategoryStyleMenu;