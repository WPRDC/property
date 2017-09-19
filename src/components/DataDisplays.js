/**
 * Created by Steve on 9/1/2017.
 */
import React from 'react';

import Typography from 'material-ui/Typography';

import Paper from 'material-ui/Paper';

import DataTable from './DataTable'
import KeyValuePairList from './KeyValueList'

import {exists, hasValues} from '../utils/dataUtils'




export function KeyValueModule(props) {
    return (
        <DataModule {...props} data={extractKeyValueSubset(props.sourceData, props.fields)} format="keyValue"/>
    );
}

export function TableModule(props) {
    return (
        <DataModule {...props}
                    data={extractTable(props.sourceData, props.tableInfo)}
                    tableInfo={props.tableInfo}
                    format="table"/>
    );
}

/**
 *
 * @param props
 * @returns {XML}
 */
export function DataModule(props) {
    const title = props.title;
    let note = props.note;
    const format = props.format;
    let dataDisplay = null;


    /* Key-Value Display */
    /* ----------------- */
    if (format === 'keyValue') {
        if (props.allowNulls || hasValues(props.data))
            dataDisplay = <KeyValuePairList data={props.data}/>;
        else
            dataDisplay = <MissingDataNote>{props.missingDataMsg}</MissingDataNote>
    }

    /* DataTable Display */
    /* ------------- */
    else if (format === 'table') {
        dataDisplay = <DataTable data={props.data}
                                 hasHeader={props.tableInfo.showHeading}
                                 hasLabel={props.tableInfo.showLabel}/>
    }

    /* Error Message Display */
    /* --------------------- */
    else {
        dataDisplay = <p className="error-note">Incorrect Data Display ({format})</p>
    }

    return (
        <div className="dataModule">
            <Typography  type="title">{title}</Typography>
            <Typography  type="subheading">{note}</Typography>
            <div>
                {dataDisplay}
            </div>
        </div>
    );
}



//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Misc Components
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>

export function MissingDataNote(props) {
    const style = {
        fontStyle: 'italic',
        color: 'dimgray',
        margin: '0',
    };
    return <p style={style} className="missing-data-msg">{props.children}</p>
}


//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Data Extraction
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>

/**
 * Extract single field from source data and format it if necessary.
 *
 * @param sourceData
 * @param fieldMapping
 * @return {*}
 */
function extractField(sourceData, fieldMapping) {
    let value = sourceData[fieldMapping.resource][0][fieldMapping.id];
    if (typeof(fieldMapping.formatter) !== 'undefined') {
        value = fieldMapping.formatter(value);
    }
    return value;
}

/**
 * Pulls out key-value mapping {title: value} from a source of data
 * @param data
 * @param fieldMapping
 * @return {{}}
 */
function extractKeyValueSubset(data, fieldMapping) {
    let subset = {};
    for (let field of fieldMapping) {
        let title = '',
            value = '';

        // items not dependent on `data`
        if (exists(field.value, field.title)) {
            title = field.title;
            value = field.value;

        }
        // items pulled from data
        else if (exists(field.resource, field.id)) {
            if (exists(field.title))
                title = field.title;
            else
                title = field.id;
            if (data[field.resource].length && data[field.resource][0].hasOwnProperty(field.id))
                value = data[field.resource][0][field.id]
        }

        if (exists(field.formatter))
            subset[title] = field.formatter(value);
        else
            subset[title] = value;
    }

    return subset;
}

/**
 * Pulls a table ( [[]...] ) from  a source of data
 * @param data
 * @param tableMapping
 * @param colLabels
 * @param rowLabels
 * @return {Array}
 */
function extractTable(data, tableProps) {
    let table = [];

    // Generate heading row
    if (tableProps.showHeading) {
        let heading = [];
        for (let field of tableProps.heading) {
            if (field === '__label__')
                heading.push('');
            else
                heading.push(field)
        }
        table.push(heading);
    }

    // Collect Data for rows
    for (let row of tableProps.rows) {
        let tempRow = [];
        for (let field of tableProps.heading) {
            if (field === '__label__')
                tempRow.push(row[field]);
            else
                tempRow.push(extractField(data, row[field]))
        }
        table.push(tempRow);
    }

    return table;
}

//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Typography Containers
// <+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>

export function Header(props) {
    let HeaderTag = 'h1';
    if ([2, 3, 4, 5, 6].includes(props.level)) {
        HeaderTag = `h${props.level}`
    }
    const defaultStyle = {
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 500,
        fontSize: '20px',
        marginTop: 0
    };

    return (
        <HeaderTag style={{...defaultStyle, ...props.style}}>{props.children}</HeaderTag>
    );
}


//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Helper Functions
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
