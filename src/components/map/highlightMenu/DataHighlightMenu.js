import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui/styles';

import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import List, {ListItem} from 'material-ui/List';
import Select from 'material-ui/Select'
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';

import {closeHighlightMenu} from "../../../actions/mapActions";

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
})


const DataHighlightMenu = props => {
    const {dataset, fields, values, isOpen, closeMenu} = props;
    return (
        isOpen
            ? <Dialog open={isOpen} onRequestClose={closeMenu}>
                <DialogTitle>
                    {dataset
                        ? <Typography type="title">{dataset.name}</Typography>
                        : "Highlight Similar Items"
                    }
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {`Highlight parcels with similar data.`}
                    </DialogContentText>

                    <FieldSelect fields={fields}/>
                    <ValueDisplay value={values[0]}/>


                </DialogContent>
                <DialogActions>
                    <Button onClick={closeMenu} color="primary">Cancel</Button>
                    <Button color="primary">Highlight</Button>
                </DialogActions>
            </Dialog>


            : null
    )
};

const FieldSelect = withStyles(styles)(
    props => {
        const {classes, fields} = props;
        return (
            <FormControl className={classes.formControl}
                         fullwidth
                         disabled={!fields || fields.length === 1}>
                <InputLabel htmlFor={'highlight-menu-field'}>Field</InputLabel>
                <Select native
                        input={<Input id="highlight-menu-field"/>}
                >
                    {fields.map(field => <option>{field}</option>)}
                </Select>
            </FormControl>
        )
    }
);

const ValueDisplay = props => {
    const {value} = props;
    return (
        <Typography type="body2">{value}</Typography>
    );
};

const mapStateToProps = (state) => {
    const {dataset, fields, values, isOpen} = state.highlightMenu;
    return {
        dataset,
        fields,
        values,
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DataHighlightMenu))