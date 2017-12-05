import React, {Component} from 'react';
import {connect} from 'react-redux';

/* Material UI Components*/
import Menu, {MenuItem} from 'material-ui/Menu';

import {setBasemap} from "../../actions/mapActions";

import {BASEMAPS} from "../../utils/mapDefaults";


class BaseMapMenu extends Component {
    /**
     * Menu for selecting basemap
     * @param {obj} props - react props
     */
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedIdx: 0,
        };
        this.handleBasemapSelect = this.handleBasemapSelect.bind(this);
    }

    /**
     * Runs when specific basemap menu item is clicked on menu
     * @param {event} event - mouse event when basemap menu item is clicked
     * @param index
     */
    handleBasemapSelect = (basemapName, index) => event => {
        const {dispatch} = this.props;
        dispatch(setBasemap(basemapName));
        this.setState(
            {selectedIndex: index},
        );
    };


    render() {
        const basemaps = BASEMAPS;
        return (
            <Menu open={this.props.open}
                  onRequestClose={this.props.handleRequestClose}
                  anchorEl={this.props.anchorEl}
            >
                {Object.keys(basemaps).map((k, i) => {
                        return (
                            <MenuItem value={k}
                                      className={"LOOKATME"}
                                      key={k}
                                      selected={i === this.state.selectedIndex}
                                      onClick={this.handleBasemapSelect(k, i)}>
                                {basemaps[k].name}
                            </MenuItem>
                        );
                    }
                )}
            </Menu>
        );
    }
}

export default connect()(BaseMapMenu)