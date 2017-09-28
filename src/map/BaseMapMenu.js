
import React, {Component} from 'react';

/* Material UI Components*/
import Button from 'material-ui/Button'
import Menu, {MenuItem} from 'material-ui/Menu';


/* Icons */
import {default as MapIcon} from 'material-ui-icons/Map'

/* Functions */



class BaseMapMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        };
        this.handleOpenClick = this.handleOpenClick.bind(this);
        this.handleBasemapSelect = this.handleBasemapSelect.bind(this);
    }

    handleOpenClick(event) {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleBasemapSelect(event) {
        this.props.updateBasemap(event.target.getAttribute('value'));
        this.setState({open: false});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const basemaps = this.props.basemaps;
        return (
            <div>
                <Button raised onClick={this.handleOpenClick}>
                    <MapIcon/> Basemmap
                </Button>
                <Menu open={this.state.open}
                      onRequestClose={this.handleClose}
                      anchorEl={this.state.anchorEl}
                >
                    {Object.keys(basemaps).map((k) => {
                            return (
                                <MenuItem value={k}
                                          key={k}
                                          onClick={this.handleBasemapSelect}>
                                    {basemaps[k].name}
                                </MenuItem>
                            );
                        }
                    )}
                </Menu>
            </div>
        );
    }
}

export default BaseMapMenu