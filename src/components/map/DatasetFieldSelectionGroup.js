import React, {Component} from 'react';

/* Material UI Components 0*/
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';

/* Functions & Global Constants */
import {COLORS} from "../../utils/dataUtils";
import {updateAvailableDatasetsFieldsValues} from "../../actions";
import {dataSource} from "../../utils/mapDefaults";

/**
 * Form Group with dataset and field options
 *
 * @param props
 * @return {XML}
 * @constructor
 */
const DatasetFieldSelectionGroup = props => {
    const {
        availableDatasets,
        availableFields,
        currentDataset,
        currentField,

        handleChange,
    } = props;

    if (currentDataset && currentField) {
        return (
            <form>
                <FormControl>
                    <InputLabel htmlFor="dataset">Dataset</InputLabel>
                    <Select
                        native
                        value={currentDataset.id}
                        onChange={handleChange('dataset')}
                        input={<Input id="dataset"/>}
                    >
                        {availableDatasets.map((dataset, i) => {
                            return <option key={i.toString()}
                                           value={dataset.id}>{dataset.name}</option>
                        })}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="field">Field</InputLabel>
                    <Select
                        native
                        value={currentField.id}
                        onChange={handleChange('field', currentDataset)}
                        input={<Input id="field"/>}
                    >
                        {availableFields.map((field, i) => {
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