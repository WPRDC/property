import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {WPRDCPropertyAPI} from './api/propertyApi'
import {PropertyDataContainer} from "./containers/propertyData";


const api = new WPRDCPropertyAPI('http://tools.wprdc.org/property-api/v1/parcels/');


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <PropertyDataContainer api={api} parcelId="0028B00154000000">
                </PropertyDataContainer>

            </div>

        );
    }
}


export default App;
