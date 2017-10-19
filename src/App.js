import React, {Component} from 'react';

import './App.css';

import {WPRDCPropertyAPI} from './api/propertyApi'
import {PropertyDataContainer} from "./containers/propertyData";
import {MapContainer} from "./map/map";

import {themeColors} from "./utils/settings"
import {getParcelCentroid} from "./utils/apiUtils"

const api = new WPRDCPropertyAPI('http://tools.wprdc.org/property-api/v1/parcels/');


class App extends Component {
    render() {
        return (
            <div className="App flex-container">
                <MainHeader className="flex-item"/>

                <MainContent className="flex-item"/>

                <MainFooter className="flex-item">
                </MainFooter>
            </div>
        );
    }
}


class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parcelId: '0028B00154000000',
            centroid: [-79.961884, 40.438340],
            changeMapZoom: false,
        };
    }

    handlePanToRequest = () => {
        this.setState({changeMapZoom: true})
    };

    updateParcel = (parcelId, method) => {
        console.log(parcelId, method);
        // Only change the zoom if the use searched, not clicked
        let changeZoom = method === 'search';
        // Get parcel's centroid and save it along with the parcel's ID
        getParcelCentroid(parcelId)
            .then((centroid) => {
                    console.log(centroid);
                    this.setState(
                        {
                            parcelId: parcelId,
                            centroid: centroid.coordinates.map((p) => +p),
                            changeMapZoom: changeZoom
                        }
                    )
                }, (err) => {
                    this.setState({parcelId: parcelId, changeMapZoom: changeZoom});
                    console.log(err)

                }
            );
    };

    render() {
        return (
            <div className={this.props.className}>
                <MapContainer className="map" id="map"
                              parcelId={this.state.parcelId}
                              center={this.state.centroid}
                              updateParcel={this.updateParcel}
                              changeMapZoom={this.state.changeMapZoom}
                />

                <PropertyDataContainer api={api}
                                       parcelId={this.state.parcelId}
                                       updateParcel={this.updateParcel}
                                       handlePanToRequest={this.handlePanToRequest}>
                </PropertyDataContainer>
            </div>
        );
    }
}

class MainHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const style = {
            padding: '10px 7px',
            backgroundColor: themeColors.black,
            color: themeColors.white,
            img: {
                height: '70px',
                display: 'block',
                float: 'left',
            },
            h1: {
                display: 'block',
                margin: '0',
                position: 'relative',
                top: '20px',
                left: '5px'
            }
        };

        return (
            <div style={style} className={this.props.className}>
                <img style={style.img}
                     src="http://www.wprdc.org/wp-content/themes/wprdc-redesign/assets/images/plain_logo_rbg_cropped.svg"/>
                <h1 style={style.h1}>Property Dashboard (beta)</h1>
            </div>
        )
    }
}

class MainFooter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const style = {
            borderTop: "3px solid black",
            background: themeColors.black,
            color: "white",
            padding: ".25rem"
        };

        return (
            <div style={style} className={this.props.className}>
                <p>&copy; 2017 WPRDC</p>
            </div>
        )
    }
}


export default App;
