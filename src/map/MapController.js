import React, {Component} from 'react';

import MapStyleMenu from "./MapStyleMenu"
import BaseMapMenu from "./BaseMapMenu"
import Button from 'material-ui/Button'
import {default as MapIcon} from 'material-ui-icons/Map';

/* Functions */
import {mapDatasets} from "./mapDefaults";

class MapController extends Component {
    /**
     * Menus for styling or changing the map
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            basemapMenuOpen: false,
            styleMenuOpen: false,
        };

        this.handleOpenClick = this.handleOpenClick.bind(this);
    }

    /**
     *
     * @param menuName
     */
    handleOpenClick = menuName => event => {
        this.setState({[menuName]: true});
    };

    handleRequestClose = menuName => event => {
        this.setState({[menuName]: false});
    };


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
                <Button raised onClick={this.handleOpenClick('styleMenuOpen')}>
                    <MapIcon/> Style
                </Button>
                <Button raised onClick={this.handleOpenClick('basemapMenuOpen')}>
                    <MapIcon/> Basemmap
                </Button>
                <BaseMapMenu open={this.state.basemapMenuOpen}
                             handleRequestClose={this.handleRequestClose('basemapMenuOpen')}
                             updateBasemap={this.props.updateBasemap}
                             basemaps={this.props.basemaps}
                />

                <MapStyleMenu open={this.state.styleMenuOpen}
                              handleRequestClose={this.handleRequestClose('styleMenuOpen')}
                              updateStyleLayer={this.props.updateStyleLayer}
                />
            </div>
        );
    }
}


export default MapController