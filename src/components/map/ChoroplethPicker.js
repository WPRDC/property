import React, {Component} from 'react'
import {FormControl, FormGroup, FormHelperText, FormControlLabel} from 'material-ui/Form';
import Button from 'material-ui/Button'
import {MenuItem} from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Switch from 'material-ui/Switch';
import Input, {InputLabel} from 'material-ui/Input';
import {CHOROPLETHS, makeChoropleth} from "../../utils/mapUtils";

import ChoroplethBar from "../ChoroplethBar"

const ChoroplethPicker = props => {
    const {value, onChange} = props;
    return (
        <FormControl>
            <InputLabel htmlFor="age-helper">Colors</InputLabel>
            <Select value={value} onChange={onChange}
                    input={<Input name="color" id="choropleth-color"/>}
                    style={{width: '110px'}}>
                {
                    Object.keys(CHOROPLETHS).map((key, index) => {
                        const choropleth = CHOROPLETHS[key]
                        const colors = choropleth['7'];
                        return (
                            <MenuItem key={index.toString()}
                                      value={key}
                            >
                                &nbsp;
                                <ChoroplethBar colors={colors} id={key} width={'80px'} style={{position: 'absolute', top: '12px'}}/>
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
};


export default ChoroplethPicker;