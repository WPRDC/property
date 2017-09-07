/**
 * Created by Steve on 9/1/2017.
 */
import React, {Component} from 'react';
import Foundation from 'react-foundation';


/**
 *
 * @param props
 * @return {XML}
 * @constructor
 */
export function DataModule(props){
    const title = this.props.title;
    const note = this.props.note;
    const warning = this.props.warning;
    return (
        <div className="module-container">
            <DataModuleHeader title={title} note={note} warning={warning}/>
            {props.children}
        </div>
    );
}

function DataModuleHeader(props) {
    const title = this.props.title;
    const note = this.props.note;
    const warning = this.props.warning;
    return (
        <div className="module-header">
            <h3 className="dd-header">{title}</h3>
            {note && <p className="dd-note">{note}</p>}
            {warning && <p className="dd-warning">{warning}</p>}
        </div>
    );
}

/*****************************************
 * Key Value Pairs
 *****************************************/
export class KeyValuePairList extends Component {
    /**
     * Renders a list of key-value pairs.  Primarily used for listing several related singular data points.
     *
     * @param props
     */
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return (
            <ul className="kv-list">
                {Object.keys(data).map((key) =>
                    <KeyValuePair key={key} field={key} val={data[key]}/>
                )}
            </ul>
        );
    }
}

function KeyValuePair(props) {
    return <li className="kv-pair">
        <dl><KeyValueKey field={props.field}/><KeyValueValue val={props.val}/></dl>
    </li>
}

function KeyValueKey(props) {
    return <dt className="kv-key">{props.field}</dt>
}

function KeyValueValue(props) {
    return <dd className="kv-val">{props.val}</dd>
}

/*****************************************
 * Table
 *****************************************/

export class Table extends Component {
    /**
     * Renders a table represented by a list of objects.
     *
     * @param props
     */
    constructor(props) {
        super(props)
    }

    render() {
        const rows = this.props.data;

        return (
            <table>
                {<TableHeaderRow rows={rows[0]}/>}
                {rows.map((row) => <TableRow row={row}/>)}
            </table>
        );
    }
}

function TableHeaderRow(props) {
    const headers = Object.keys(props.rows);
    return (
        <tr>
            {headers.map((header) => <th>{header}</th>)}
        </tr>
    );

}

function TableRow(props) {
    const row = props.row;
    return (
        <tr>
            {Object.keys(row).map((key) => <td>{row[key]}</td>)}
        </tr>);
}