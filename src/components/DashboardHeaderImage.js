import React, {Component} from 'react';

/* Material UI Components */
import {LinearProgress} from 'material-ui/Progress';

import {getStreetViewImage} from '../utils/apiUtils' // Todo: replace with redux stuff


export class DashboardHeaderImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streetViewImg: null,
        }
    }

    componentDidMount() {
        this.setState({
            streetViewImg: null,
        });
        getStreetViewImage(this.props.address)
            .then((url) => {
                this.setState({streetViewImg: url})
                console.log("new image, son!");
            }, (err) => {
                console.log('err', err);
            })
    }


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
                <img alt={address} style={{...defaultStyle, ...this.props.style}} src={this.state.streetViewImg}/>
            );
        }


    }
}

export default DashboardHeaderImage