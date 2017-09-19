/**
 * Created by sds25 on 9/19/17.
 */
import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
});


function KeyValuePairList(props) {
    const data = props.data;
    const style = {
        listStyle: 'none',
        margin: '0 0 0 0',
        padding: '0'
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
    const listStyle = {
        padding: '8px 0'
    };

    return <li style={listStyle} className="kv-pair">
        <dl style={{margin: '0'}}>
            <KeyValueKey field={props.field}/>
            <KeyValueValue key={props.field} val={props.val}/>
        </dl>
    </li>
}

function KeyValueKey(props) {
    const style = {
        paddingLeft: '',
        fontSize: '13px',
    };
    return <dt style={style} className="kv-key">{props.field}</dt>
}

function KeyValueValue(props) {
    const style = {
        paddingLeft: '',
        marginLeft: '0',
        fontSize: '13px',
        color: 'dimgray'
    };

    return <dd style={style} className="kv-val">{props.val}</dd>
}

export default withStyles(styles)(KeyValuePairList)