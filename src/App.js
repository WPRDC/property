import React, {Component} from 'react';

import './App.css';

import {WPRDCPropertyAPI} from './api/propertyApi'
import {PropertyDataContainer} from "./containers/propertyData";
import {MapContainer} from "./map/map";

import {themeColors} from "./utils/settings"

const api = new WPRDCPropertyAPI('http://tools.wprdc.org/property-api/v1/parcels/');


class App extends Component {
    render() {
        return (
            <div className="App flex-container">
                <MainHeader className="flex-item"/>

                <MainContent className="flex-item"/>

                <MainFooter className="flex-item">
                    <p>This is a footer.</p>
                </MainFooter>
            </div>
        );
    }
}


class MainContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parcelId: '0028B00154000000'
        }
        this.updateParcel = this.updateParcel.bind(this)
    }

    updateParcel(parcelId) {
        this.setState({parcelId: parcelId})
    }

    render() {
        console.log(this.state.parcelId);
        return (
            <div className={this.props.className}>
                <MapContainer className="map" id="map"
                              parcelId={this.state.parcelId}
                              updateParcel={this.updateParcel}/>

                <PropertyDataContainer api={api}
                                       parcelId={this.state.parcelId}
                                       updateParcel={this.updateParcel}> </PropertyDataContainer>
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
            padding: '20px',
            backgroundColor: themeColors.black,
            color: themeColors.white,
        }

        return (
            <div style={style} className={this.props.className}>
                <h1>Property Dashboard</h1>
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
                <p>Copyright the future WPRDC</p>
            </div>
        )
    }
}


export default App;
