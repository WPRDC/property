import React, {Component} from 'react';

/* Material UI Components */
import {LinearProgress} from 'material-ui/Progress';

import {makeStreetViewUrl} from '../../utils/apiUtils' // Todo: replace with redux stuff


export class DashboardHeaderImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streetViewImg: null,
        }
    }
    //
    // componentDidMount() {
    //     console.log("DID MOUNT");
    //     getStreetViewImage(this.props.address)
    //         .then((url) => {
    //             this.setState({streetViewImg: url})
    //         }, (err) => {
    //             console.log('ERROR:', err);
    //         })
    // }


    render() {
        let img = null;
        let address = this.state.address;
        const defaultStyle = {
            maxWidth: '100%',
            display: 'block'
        };

        if (this.state.streetViewImg === null) {

            return (
                <div>
                    <div style={{width: '100%', height: '232px'}}/>
                    <LinearProgress mode="query"/>
                </div>);
        } else {
            return (
                <img alt={address} style={{...defaultStyle, ...this.props.style}} src={makeStreetViewUrl(this.props.address)}/>
            );
        }


    }
}

export default DashboardHeaderImage