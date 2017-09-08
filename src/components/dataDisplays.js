/**
 * Created by Steve on 9/1/2017.
 */
import React, {Component} from 'react';

/**
 *
 * @param props
 * @returns {XML}
 */
export class DataModule extends Component {
    constructor(props) {
        super(props);
        this.state = {data: {}}
    }

    componentDidMount(){
        this.props.api.get(this.props.format, this.props.parcelId, this.props.fieldMapping)
    }

    render() {
        const title = this.props.title;
        const note = this.props.note;
        const warning = this.props.warning;
        const format = this.props.format;

        let dataDisplay = null;
        if (format === 'keyValue') {
            dataDisplay = <KeyValuePairList data={this.state.data}/>
        } else if (format === 'table') {
            dataDisplay = <Table data={this.state.data}/>
        } else {
            dataDisplay = <p className="error-note">Incorrect Data Display ({format})</p>
        }

        return (
            <div className="module-container">
                <DataModuleHeader title={title} note={note} warning={warning}/>
                {dataDisplay}
            </div>
        );
    }
}

function DataModuleHeader(props) {
    const title = props.title;
    const note = props.note;
    const warning = props.warning;
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
export function KeyValuePairList(props) {
    const data = props.data;

    return (
        <ul className="kv-list">
            {Object.keys(data).map((key) =>
                <KeyValuePair key={key} field={key} val={data[key]}/>
            )}
        </ul>
    );
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
export function Table(props) {
    const rows = props.data;

    return (
        <table>
            {<TableHeaderRow rows={rows[0]}/>}
            {rows.map((row) => <TableRow row={row}/>)}
        </table>
    );

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