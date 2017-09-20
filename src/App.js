import React, {Component} from 'react';

import './App.css';

import {WPRDCPropertyAPI} from './api/propertyApi'
import {PropertyDataContainer} from "./containers/propertyData";
import {MapContainer} from "./containers/map";

import {themeColors} from "./utils/settings"

const api = new WPRDCPropertyAPI('http://tools.wprdc.org/property-api/v1/parcels/');


class App extends Component {
    render() {
        return (
            <div className="App flex-container">
                <MainHeader className="flex-item"/>

                <MainContent className="flex-item">
                    <MapContainer className="map" id="map"/>
                    <PropertyDataContainer api={api} parcelId="0028B00154000000"> </PropertyDataContainer>
                </MainContent>

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
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
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
