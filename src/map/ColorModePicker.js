import React, {Component} from 'react'

import Select from 'material-ui/Select';

import {FormControl, FormHelperText} from 'material-ui/Form';

const ColorModePicker = props => {
    return (
        <FormControl>
            <InputLabel htmlFor="colorMode">Style Mode</InputLabel>
            <Select
                native
                value={props.value}
                onChange={props.onChange}
                input={<Input id="colorMode"/>}
            >
                <option value={'fill'}>Fill</option>
                <option value={'line'}>Outline</option>

            </Select>
        </FormControl>
    );
};

export default ColorModePicker;