import React, {Component} from 'react'
import {connect} from 'react-redux'

import BaseMapMenu from './BaseMapMenu';

import {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List';
import LayersIcon from 'material-ui-icons/Layers'

import Avatar from 'material-ui/Avatar';

import {green} from 'material-ui/colors'
import {toggleBasemapMenu, closeBasemapMenu, selectBasemap} from "../../actions/mapActions";
import {BASEMAPS} from "../../utils/mapDefaults";

const style = {
    backgroundColor: green[600]
};

class BasemapListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {anchorEl: null}
    }

    handleClick = e => {
        this.setState({anchorEl: e.currentTarget})
        this.props.toggleBasemapMenu()
    }

    render() {
        const {
            menuIsOpen,
            selectedBasemap,
            selectBasemap,
            requestCloseBasemapMenu,
        } = this.props;
        const {
            anchorEl
        } = this.state

        return (
            <ListItem button={true} onClick={this.handleClick}>
                <ListItemAvatar>
                    <Avatar>
                        <LayersIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={"Basemap Layer"} secondary={selectedBasemap.name}/>

                <BaseMapMenu open={menuIsOpen}
                             anchorEl={anchorEl}
                             basemaps={BASEMAPS}
                             handleRequestClose={requestCloseBasemapMenu}
                             handleSelectBasemap={selectBasemap}
                />
            </ListItem>
        );
    }
};

const mapStateToProps = state => {
    const {menuIsOpen, selectedBasemap, anchorEl} = state.basemap;
    return {
        menuIsOpen,
        selectedBasemap,
        anchorEl
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleBasemapMenu: () => {
            dispatch(toggleBasemapMenu());
        },
        requestCloseBasemapMenu: (event) => {
            if (event.type !== 'click') {
                dispatch(closeBasemapMenu())
            }
        },

        selectBasemap: (basemap) => {
            dispatch(selectBasemap(basemap))

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasemapListItem);