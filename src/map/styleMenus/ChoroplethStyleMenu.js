import React, {Component, PureComponent} from 'react';

/* Material UI Components*/
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import Avatar from 'material-ui/Avatar';
import {FormControl, FormHelperText} from 'material-ui/Form';

import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import LayersIcon from 'material-ui-icons/Layers';

/* Defaults & Helper Functions */
import {createChoroplethCSS, createStyleSQL, QUANTIFICATION_METHODS, CHOROPLETHS} from '../mapUtils';

const BIN_OPTIONS = [3, 4, 5, 6, 7];

// Get `first` key from CHOROPLETHS as default color
const DEFAULT_COLOR = Object.keys(CHOROPLETHS)[0];


class ChoroplethStyleMenu extends PureComponent {
    /**
     * Menu for defining choropleth style for map.
     * @param {obj} props - react props
     */
    constructor(props) {
        super(props);

        this.state = {
            binCount: 5,
            colorName: DEFAULT_COLOR,
            quantMethod: 'quantiles'
        }
    }

    /**
     * Updates the SQL and cartoCSS that define style on a Carto Map.
     * @private
     */
    _handleStyleInfoChange = () => {
        let sql = createStyleSQL(this.props.dataset, this.props.field);
        let css = createChoroplethCSS(this.props.dataset, this.props.field,
            this.state.binCount, this.state.colorName, this.state.quantMethod);

        this.props.handleStyleInfoChange(sql, css);
        this._updateSavedState();
    };

    _updateSavedState() {
        this.props.updateSavedState(this.state)
    }


    /**
     * Runs when item is selected from menu.
     * @param {string} name - name of state property to be updated
     */
    handleMenuChange = (name) => (event) => {
        this.setState({[name]: event.target.value}, this._handleStyleInfoChange)
    };

    /**
     * Runs after component mounts.  Updates style info.
     */
    componentDidMount = () => {
        if (this.props.savedState) {
            console.log(this.props.savedState);
            this.setState(this.props.savedState, () => {
                this.render()
            })
        } else{
            this._handleStyleInfoChange();
        }
    };

    /**
     * Runs after component mounts.  Updates style info.
     */
    componentDidUpdate = () => {
        this._handleStyleInfoChange();
    };

    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="bins-select"># Bins</InputLabel>
                    <Select
                        native
                        value={this.state.binCount}
                        onChange={this.handleMenuChange('binCount')}
                        input={<Input id="bins-select"/>}
                    >
                        {BIN_OPTIONS.map((bins, i) => <option key={i.toString()} value={bins}>{bins}</option>)}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="colors-select">Colors</InputLabel>
                    <Select
                        native
                        value={this.state.colorName}
                        onChange={this.handleMenuChange('colorName')}
                        input={<Input id="colors-select"/>}
                    >
                        {Object.keys(CHOROPLETHS).map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="quantification-method-select">Quantification</InputLabel>
                    <Select
                        native
                        value={this.state.quantMethod}
                        onChange={this.handleMenuChange('quantMethod')}
                        input={<Input id="quantification-method-select"/>}
                    >
                        {Object.keys(QUANTIFICATION_METHODS).map((q) => (
                            <option key={q} value={q}>{QUANTIFICATION_METHODS[q].title}</option>
                        ))}
                    </Select>
                </FormControl>

            </div>
        );
    }
}

export default ChoroplethStyleMenu;