import React, {Component} from 'react';

/* Material UI Components*/
import Menu, {MenuItem} from 'material-ui/Menu';

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
    handleBasemapSelect = (event, index) => {
        this.setState(
            {selectedIndex: index},
            this.props.updateBasemap(event.target.getAttribute('value'))
        );
    };
6

    render() {
        const basemaps = this.props.basemaps;
        return (
            <Menu open={this.props.open}
                  onRequestClose={this.props.handleRequestClose}
                  anchorEl={this.props.anchorEl}
            >
                {Object.keys(basemaps).map((k, i) => {
                        return (
                            <MenuItem value={k}
                                      key={k}
                                      selected={i === this.state.selectedIndex}
                                      onClick={event => this.handleBasemapSelect(event, i)}>
                                {basemaps[k].name}
                            </MenuItem>
                        );
                    }
                )}
            </Menu>
        );
    }
}

export default BaseMapMenu