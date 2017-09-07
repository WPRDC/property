import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {KeyValuePairList, Table} from './components/dataDisplays.js'

import {WPRDCPropertyAPI} from './api/propertyApi'

const stuff = {'a': 1, 'b': 2};
const tableStuff = [{'a': 1, 'b': '2'}, {'a': 5, 'b': 16}];
let a = new WPRDCPropertyAPI("http://tools.wprdc.org/property-api/v1/parcels/0028F00194000000");
let things = a.getKeyValueData('', [{resource: 'assessments', id: 'CLASSDESC', title: "Class Type"}]);
things.then( (thing) => {console.log('good', thing)}, (err)=> {console.log(err)});



class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <KeyValuePairList data={things}/>
                <Table data={tableStuff}/>

                <DataModule />
            </div>

        );
    }
}


export default App;
