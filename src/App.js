import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {KeyValuePairList, Table} from './components/dataDisplays.js'

const stuff = {'a': 1, 'b': 2};
const tableStuff = [{'a': 1, 'b': '2'}, {'a': 5, 'b': 16}];

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
                <KeyValuePairList data={stuff}/>
                <Table data={tableStuff}/>
            </div>

        );
    }
}

export default App;
