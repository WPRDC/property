import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui/styles';

import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';

import {
    addStyleLayer, closeHighlightMenu, displayStyleLayerList, selectHighlightMenuField,
    updateStyleLayer
} from "../../actions/styleMenuActions";

import ColorPicker from '../../ColorPicker'
import {selectHighlightMenuColor} from "../../actions/index";
import {displayStyleLayerListMenu} from "../../actions";

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
})


class DataHighlightMenu extends Component {
    constructor(props) {
        super(props)

        //todo: move state to redux and remove this crap, make it a functional component
        this.state = {
            range: null,
        }
    }

    handleSubmit = () => {
        const {dataset, items, selectedIndex, color, styleLayers, handleSubmit} = this.props;
        const {field, values, makeSql, makeCss} = items[selectedIndex];

        // Generate final sql and css from range and color
        const {range} = this.state;
        const styleInfo = {sql: makeSql(range), css: makeCss(color)};  // move this to redux state
        handleSubmit(styleLayers, styleInfo, dataset, field, items);
    };

    render() {
        const {
            dataset,
            items,
            selectedIndex,
            color,
            isOpen,

            closeMenu,
            handleSelectField,
            handleSelectColor
        } = this.props;

        return (
            isOpen
                ? <Dialog open={isOpen} onRequestClose={closeMenu}>
                    <DialogTitle>
                        {dataset
                            ? dataset.name
                            : "Highlight Similar Items"
                        }
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            {`Highlight parcels with similar data.`}
                        </DialogContentText>

                        <FieldValueMenu items={items} index={selectedIndex} onChange={handleSelectField}>

                        </FieldValueMenu>

                    </DialogContent>
                    <DialogActions>
                        <FormControl>
                            <ColorPicker color={color} onChange={handleSelectColor}/>
                        </FormControl>
                        <Button onClick={closeMenu} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmit} color="primary">Highlight</Button>
                    </DialogActions>
                </Dialog>
                : null
        )
    }
};

const FieldValueMenu = props => {
    const {items, index, onChange} = props;
    const {field, value, formatter} = items[index];
    return (
        <div>
            <FieldSelect items={items} onChange={onChange}/>
            <br/><br/>
            <ValueDisplay value={value} formatter={formatter}/>
        </div>
    )
};

class FieldSelect extends Component {

    handleChange = event => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {items, onChange} = this.props;
        return (
            <FormControl>
                <InputLabel htmlFor={'highlight-menu-field'}>Field</InputLabel>
                <Select native
                        input={<Input id="highlight-menu-field"/>}
                        onChange={this.handleChange}
                >
                    {items.map((item, i) => <option key={i.toString()} value={i}>{item.field}</option>)}
                </Select>
            </FormControl>
        )
    }
}

const ValueDisplay = props => {
    const {value, formatter} = props;
    return (
        <Typography type="body2">{formatter(value)}</Typography>
    );
};

const mapStateToProps = (state) => {
    const {dataset, items, selectedIndex, color, isOpen} = state.highlightMenu;
    const styleLayers = state.styleLayers;
    return {
        dataset,
        items,
        selectedIndex,
        color,
        isOpen,
        styleLayers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeMenu: () => {
            dispatch(closeHighlightMenu())
        },
        handleSelectField: index => {
            dispatch(selectHighlightMenuField(index))
        },
        handleSelectColor: color => {
            dispatch(selectHighlightMenuColor(color))
        },

        handleSubmit: (styleLayers, styleInfo, dataset, fieldName, items) => {
            const layerIndex = styleLayers.findIndex(layer => layer.layerType === 'HIGHLIGHT_LAYER');

            const menuInfo = {
                currentTab: 'Highlight',
                dataset,
                field: {name: fieldName},
                items,
            };

            if (layerIndex > -1) {
                dispatch(updateStyleLayer(layerIndex, menuInfo, styleInfo));
            } else {
                dispatch(addStyleLayer('HIGHLIGHT_LAYER', menuInfo, styleInfo))
            }
            dispatch(closeHighlightMenu());
            dispatch(displayStyleLayerListMenu());
        }
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DataHighlightMenu))