import React, {Component} from 'react';

/* Material UI Components*/
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText} from 'material-ui/List';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';

/* Defaults & Helper Functions */
import {mapDatasets} from "../mapDefaults";
import {getFieldValues, createCategoryCSS, createStyleSQL} from '../mapUtils';


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