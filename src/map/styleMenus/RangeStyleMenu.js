import React, {Component, PureComponent} from 'react';

/* Material UI Components*/
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';
import Input, {InputLabel} from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';

import Avatar from 'material-ui/Avatar';
import {FormControl, FormHelperText} from 'material-ui/Form';

import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import LayersIcon from 'material-ui-icons/Layers';

/* Defaults & Helper Functions */
import {createChoroplethCSS, createStyleSQL, QUANTIFICATION_METHODS, COLORS, createRangeCSS} from '../mapUtils';

class RangeStyleMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
            end: 1,
            color: 'red'
        }
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value}, this._handleStyleInfoChange)
    };

    _handleStyleInfoChange(){
        let sql = createStyleSQL(this.props.dataset, this.props.field);
        let css = createRangeCSS(this.props.dataset, this.props.field, this.state.start, this.state.end, this.state.color);

        this.props.handleStyleInfoChange(sql, css)
    }


    render() {
        return (
            <div>
                <TextField
                    label="Start"
                    type="number"
                    value={this.state.start}
                    onChange={this.handleChange('start')}
                />

                <TextField
                    label="End"
                    type="number"
                    value={this.state.end}
                    onChange={this.handleChange('end')}
                />
                <FormControl>
                    <InputLabel htmlFor="color-select">Colors</InputLabel>
                    <Select
                        native
                        value={this.state.colorName}
                        onChange={this.handleChange('color')}
                        input={<Input id="color-select"/>}
                    >
                        {COLORS.map((color) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }

}

export default RangeStyleMenu