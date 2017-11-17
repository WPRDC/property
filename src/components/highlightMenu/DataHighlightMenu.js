import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography';


import {closeHighlightMenu} from "../../actions/mapActions";

const DataHighlightMenu = props => {
    const {dataset, fields, isOpen, closeMenu} = props;
    return (
        <Dialog open={isOpen} onRequestClose={closeMenu}>
            <AppBar position="static" color="default">
                <DialogTitle>Highlight Map with This Data</DialogTitle>
            </AppBar>
            <DialogContent>
                {dataset
                    ? <Typography type="title">{dataset.name}</Typography>
                    : null
                }
                <FormControl>
                </FormControl>

            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    const {isOpen} = state.highlightMenu;
    return {
        isOpen
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeMenu: () => {
            dispatch(closeHighlightMenu())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataHighlightMenu)