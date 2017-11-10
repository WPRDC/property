import React, {Component} from 'react';

import './App.css';
import { connect } from 'react-redux'
import ParcelDashboard from './containers/ParcelDashboard'
//import InterfaceMap from "./map/map";
import InterfaceMap from "./containers/InterfaceMap";

import Footer from './components/Footer'
import Header from './components/Header'

import {
    fetchParcelDataIfNeeded, fetchParcelImageIfNeeded,
    selectParcel

} from "./actions/index";
import {setSelectedParcelShape} from "./actions/mapActions";

class App extends Component {

    // When it mounts, get the data
    componentDidMount = () => {
        const {dispatch, currentParcelId} = this.props;
        dispatch(setSelectedParcelShape(currentParcelId));
        dispatch(fetchParcelDataIfNeeded(currentParcelId));
    };

    // When it updates, if there's a new parcel ID, get the data for it
    componentDidUpdate = prevProps => {
        if (this.props.currentParcelId !== prevProps.currentParcelId) {
            const {dispatch, currentParcelId} = this.props
            dispatch(setSelectedParcelShape(currentParcelId));
            dispatch(fetchParcelDataIfNeeded(currentParcelId));
        }
    };

    handleParcelChange = (nextParcelId) => {
        this.props.dispatch(selectParcel(nextParcelId));
    }

    render() {
        const { currentParcelId } = this.props;
        return (
            <div className="App flex-container">
                <Header className="flex-item"/>

                <div className="flex-item">
                    <InterfaceMap className="map" id="map"
                                  parcelId={currentParcelId}
                                  center={[-79.961884, 40.438340]}
                                  updateParcel={this.handleParcelChange}
                    />

                    <ParcelDashboard />
                </div>

                <Footer className="flex-item">
                </Footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {currentParcelId, parcelDataById} = state
    const {
        isFetching,
        lastUpdated,
        data
    } = parcelDataById[currentParcelId] || {
        isFetching: true,
        data: {}
    }


    return {
        currentParcelId,
        data,
        isFetching,
        lastUpdated
    }
}


export default connect(mapStateToProps)(App)
