import React, {Component} from 'react';
import Typography from 'material-ui/Typography';

import KeyValueList from './KeyValueList';
import MissingDataNote from './MissingDataNote';
import {extractKeyValueSubset, hasValues} from "../../../utils/dataUtils";

const KeyValueListDisplay = props => {
    const {title, note, data, fields, missingDataMsg, allowNulls} = props;
    const displayData = extractKeyValueSubset(data, fields);

    return (
        <div>
            {
                (allowNulls || hasValues(displayData)) ?
                    <KeyValueList data={displayData}/> :
                    <MissingDataNote>{missingDataMsg}</MissingDataNote>
            }
        </div>

    );
};

export default KeyValueListDisplay