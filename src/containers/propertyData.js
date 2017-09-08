/**
 * Created by sds25 on 9/6/17.
 */
import React, {Component} from 'react'

import {DEFAULT_PARCEL_ID} from '../utils/settings.js'
import {DataModule, KeyValuePairList, Table} from '../components/dataDisplays'

export class PropertyDataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {parcel: DEFAULT_PARCEL_ID}
    }

    componentDidMount() {

    }

    render() {
        // Here is where we'll load all of the available DataModules
        return (
            <div>
                <PropertyHeader address={this.props.address}/>
                {this.props.children}
            </div>
        );
    }
}

function PropertyHeader(props) {
    return (
        <div className="pdata-header">
            <h1>{props.address}</h1>
        </div>
    );
}

export function PropertyDataSection(props) {
    return (
        <div className="pdata-section">
            {props.children}
        </div>
    );
}


export function BasicInfoModule(props){
    let data= props.api.

    return (
        <DataModule title="">
            <KeyValuePairList data={props.data}/>
        </DataModule>
    );
}