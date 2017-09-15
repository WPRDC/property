/**
 * Created by Steve on 9/1/2017.
 */
import React from 'react';


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
    const note = props.note;
    const warning = props.warning;
    const format = props.format;
    let dataDisplay = null;

    const style = {
        border: '1px solid black',
        margin: '.4rem',
        padding: '.5rem'
    }


    /* Key-Value Display */
    /* ----------------- */
    if (format === 'keyValue') {
        if (props.allowNulls || hasValues(props.data))
            dataDisplay = <KeyValuePairList data={props.data}/>;
        else
            dataDisplay = <MissingDataMessage msg={props.missingDataMsg}/>;
    }

    /* Table Display */
    /* ------------- */
    else if (format === 'table') {
        dataDisplay = <Table data={props.data}
                             hasHeader={props.tableInfo.showHeading}
                             hasLabel={props.tableInfo.showLabel}/>
    }

    /* Error Message Display */
    /* --------------------- */
    else {
        dataDisplay = <p className="error-note">Incorrect Data Display ({format})</p>
    }

    return (
        <div style={style} className="module-container">
            <DataModuleHeader title={title} note={note} warning={warning}/>
            {dataDisplay}
        </div>
    );
}


function DataModuleHeader(props) {
    const hStyle = {
        margin: 0
    }

    return (
        <div className="module-header">
            <h3 style={hStyle} className="dd-header">{props.title}</h3>
            {props.note && <p className="dd-note">{props.note}</p>}
            {props.warning && <p className="dd-warning">{props.warning}</p>}
        </div>
    );
}

/*****************************************
 * Key Value Pairs
 *****************************************/
export function KeyValuePairList(props) {
    const data = props.data;
    const style = {
        listStyle: 'none',
        marginLeft: '0',
        paddingLeft: '0'
    };

    return (
        <ul className="kv-list" style={style}>
            {Object.keys(data).map((key) =>
                <KeyValuePair key={key.toString()} field={key} val={data[key]}/>
            )}
        </ul>
    );
}

function KeyValuePair(props) {
    const listStyle={
        paddingBottom: '0.3rem'
    };
    const afterStyle = {
        display: 'table',
        clear: 'both',
    };
    return <li style={listStyle} className="kv-pair">
        <dl style={{margin: '0'}} ><KeyValueKey field={props.field}/><KeyValueValue key={props.field} val={props.val}/></dl>
        <div style={afterStyle}> </div>
    </li>
}

function KeyValueKey(props) {
    const style = {
        float: 'left',
        textAlign: 'right',
        verticalAlign: 'baseline',
        width: '20%',
        clear: 'left',
        fontWeight: 'bold'
    };
    return <dt style={style} className="kv-key">{props.field}</dt>
}

function KeyValueValue(props) {
    const style = {
        float: 'left',
        verticalAlign: 'baseline',
        width: '70%',
        marginLeft: '1rem',
        fontStyle: 'italic'
    };

    return <dd style={style} className="kv-val">{props.val}</dd>
}

/*****************************************
 * Table
 *****************************************/
export function Table(props) {
    const rows = props.data;
    let header, dataRows;
    if (props.hasHeader) {
        header = rows[0];
        dataRows = rows.slice(1);
    } else {
        dataRows = rows;
    }


    return (
        <table>
            {header && <thead><TableHeaderRow row={header}/></thead>}
            <tbody>
            {dataRows.map((row, i) => <TableRow key={i.toString()} row={row} hasLabel={props.hasLabel}/>)}
            </tbody>
        </table>
    );

}

function TableHeaderRow(props) {
    return (
        <tr>
            {props.row.map((header, i) => <th key={i}>{header}</th>)}
        </tr>
    );

}

function TableRow(props) {
    let label, row;
    if (props.hasLabel) {
        label = props.row[0];
        row = props.row.slice(1);
    } else {
        row = props.row;
    }

    return (
        <tr>
            {label && <td key="label" className="label">{label}</td>}
            {row.map((value, i) => <td key={i.toString()}>{value}</td>)}
        </tr>);
}

//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
// Misc Components
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>

export function MissingDataMessage(props) {
    return <p className="missing-data-msg">{props.msg}</p>
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
// Helper Functions
//<+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+><+>
/**
 * Check if all `things` exist
 *
 * @param {stuff} things - variable amount of arguments to test for existence
 * @return {boolean} `true` if all things exist, `false` otherwise
 */
function exists(...things) {
    for (let thing of things) {
        if (typeof(thing) === 'undefined') {
            return false;
        }
    }
    return true;
}

/**
 * Checks that all properties of object have values.
 *
 * @param obj
 * @return {boolean}
 */
function hasValues(obj) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (obj[k] === null || typeof(obj[k]) === 'undefined')
                return false;
        }
    }
    return true;
}
