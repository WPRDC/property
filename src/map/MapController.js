import React, {Component} from 'react';

import MapStyleMenu from "./mapStyle"
import BaseMapMenu from "./BaseMapMenu"

/* Functions */
import {mapDatasets} from "./mapDefaults";

const DEFAULT_DATASET = Object.keys(mapDatasets)[0];

class MapController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basemapMenuOpen: false,
            styleMenuStates: {'category': null, 'choropleth': null, 'range': null},
            datasetName: '',
            fieldName: ''
        };

        this.saveMenuState = this.saveMenuState.bind(this);
    }

    /**
     * Save the state of a style menu for use when it's opened again.
     *
     * @param {string} menu - name of menu
     * @param menuState
     * @param datasetName
     * @param fieldName
     */
    saveMenuState(menu, menuState, datasetName, fieldName) {
        const styleMenuStates = this.state.styleMenuStates;
        styleMenuStates[menu] = menuState;
        this.setState({styleMenuStates: styleMenuStates, datasetName: datasetName, fieldName: fieldName})
    }


    render() {
        const style = {
            base: {
                position: 'absolute',
                top: '10px',
                right: '10px',
            },
            button: {
                margin: '0 4px',
                fontWeight: '600'
            }
        };

        return (
            <div style={style.base}>
                <BaseMapMenu updateBasemap={this.props.updateBasemap} basemaps={this.props.basemaps}/>
                <MapStyleMenu updateStyleLayer={this.props.updateStyleLayer}
                              savedStates={this.state.styleMenuStates}
                              saveMenuState={this.saveMenuState}/>
            </div>
        );
    }
}




export default MapController