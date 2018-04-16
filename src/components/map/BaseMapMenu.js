import React, {Component} from 'react';
import {connect} from 'react-redux';

/* Material UI Components*/
import Menu, {MenuItem} from 'material-ui/Menu';


class BaseMapMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  handleBasemapSelect = (basemapName, index) => event => {
    const {basemaps, handleSelectBasemap} = this.props;
    handleSelectBasemap(basemaps[basemapName])
    this.setState(
      {selectedIndex: index},
    );
  };

  render() {
    const {basemaps} = this.props;
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

export default BaseMapMenu