import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {WPRDCPropertyAPI} from './api/propertyApi'
import {DataModule, KeyValuePairList, Table} from './components/dataDisplays.js'
import {PropertyDataContainer, PropertyDataSection} from "./containers/propertyData";


const api = new WPRDCPropertyAPI()


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <PropertyDataContainer address="226 Shady Ave">

                    <PropertyDataSection>
                        <DataModule title="" note="This is a place for things and stuff">
                            <KeyValuePairList/>
                        </DataModule>
                    </PropertyDataSection>



                </PropertyDataContainer>

            </div>

        );
    }
}


export default App;
