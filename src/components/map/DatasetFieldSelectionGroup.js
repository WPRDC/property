import React, {Component} from 'react';

/* Material UI Components 0*/
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';

/* Functions & Global Constants */
import {COLORS} from "../../utils/dataUtils";

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

export default DatasetFieldSelectionGroup