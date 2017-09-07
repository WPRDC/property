/**
 * Created by sds25 on 9/6/17.
 */
import react, {Component} from 'react'

import DEFAULT_PARCEL_ID from '../utils/settings'


export class PropertyDataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {parcel: DEFAULT_PARCEL_ID}
    }

    componentDidMount() {

    }

    render() {
        // Here is where we'll load all of the available DataModules
    }
}

function PropertyDataSection(props) {
    return (
        <div className="pdata-section">
            {props.children}
        </div>
    );
}