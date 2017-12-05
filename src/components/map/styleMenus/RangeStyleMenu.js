import React, {Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';

/* Material UI Components*/
import Input, {InputLabel} from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';

import {FormControl, FormHelperText} from 'material-ui/Form';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

/* Defaults & Helper Functions */
import {createStyleSQL, createRangeCSS, findMinMaxValues, QUANTIFICATION_METHODS, COLORS,} from '../../../utils/mapUtils';

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Range = createSliderWithTooltip(Slider.Range);


class RangeStyleMenu extends Component {
    /**
     * Menu for styling based on membership within a range of values.
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            min: 0,         // minimum possible value
            max: 100,       // maximum possible value
            values: [0, 1], // actual values selected by range slider
            color: 'red',
            styleMode: 'fill'      // fill or line
        }
    }

    /**
     * Updates the SQL and cartoCSS that define style on a Carto InterfaceMap.
     * @private
     */
    _handleStyleInfoChange = () => {
        let sql = createStyleSQL(this.props.dataset, this.props.field);
        let css = createRangeCSS(this.props.dataset, this.props.field, this.state.values[0], this.state.values[1], this.state.color, this.state.styleMode);
        this.props.handleStyleInfoChange(sql, css);
        this._updateSavedState();
    }

    _updateSavedState() {
        this.props.updateSavedState(this.state)
    }

    /**
     * When mounted or updated, collect reasonable bounds and starting points for Range.
     * @private
     */
    _initRange = (dataset, field) => {
        let range = field.range;

        // If there the field has a fully predfined range, we don't need to make an API call
        if (range && range[0] !== null && range[1] !== null) {
            let q2 = range[0] + ((range[1] - range[0]) / 4);
            let q3 = range[0] + (3 * (range[1] - range[0]) / 4);
            this.setState(
                {
                    min: range[0],
                    max: range[1],
                    values: [q2, q3]
                },
                this._handleStyleInfoChange()
            )
        }
        // Otherwise we'll need to fill in the gaps with live data
        else {
            findMinMaxValues(dataset, field)
                .then(
                    (data) => {
                        // Check that values are numbers.
                        // This may be true when first mounted, before filters fields are provided
                        // TODO: look into ensuring correct fields before loading specific menu components
                        if (isNaN(data.min) || isNaN(data.max)) {
                            console.log(data, 'no numbers')
                        } else {
                            let min = range[0] !== null ? range[0] : data.min;
                            let max = range[1] !== null ? range[1] : data.max;
                            let q2 = min + ((max - min) / 4);
                            let q3 = min + (3 * (max - min) / 4);
                            this.setState(
                                {
                                    min: min,
                                    max: max,
                                    values: [q2, q3]
                                },
                                this._handleStyleInfoChange()
                            )
                        }
                    },
                    (err) => console.log(err)
                )
        }
    };


    /**
     * Runs when a form item is changed. Updates the inut's respective state property.
     * @param  {string} name - name of state property to be updated
     */
    handleChange = (name) => (event) => {
        switch (name) {
            case 'color':
                this.setState({color: event.target.value}, this._handleStyleInfoChange);
                break;
            case 'lower':
                this.setState({values: [event.target.value, this.state.values[1]]});
                break;
            case 'upper':
                this.setState({values: [this.state.values[0], event.target.value]});
                break;
            case 'styleMode': {
                this.setState({styleMode: event.target.value}, this._handleStyleInfoChange);
                break;
            }

        }
    };


    /**
     * Runs when range slider is moved.  Updates the values in state based on slider state.
     * @param {array} values - array of two values [lower, upper] ends of range.
     */
    onRangeSliderChange = (values) => {
        this.setState({values,})
    };


    /**
     * Runs when new props are provided. Initializes the range based on props in `nextProps`
     *
     * @param {obj} nextProps - set of new props
     */
    componentWillReceiveProps = (nextProps) => {
        this._initRange(nextProps.dataset, nextProps.field)
    };


    componentWillMount = () => {

    }

    /**
     * Runs when component is mounted.  Initializes the range.
     */
    componentDidMount = () => {
        if (this.props.savedState) {
            console.log(this.props.savedState);
            this.setState(this.props.savedState, () => {
                this.render()
            })
        } else {
            this._initRange(this.props.dataset, this.props.field)
        }
    };

    /**
     * Runs when component is updated.  Updates the style data.
     */
    componentDidUpdate = () => {
        this._handleStyleInfoChange();
    };


    render() {
        return (
            <div>
                <Range min={this.state.min} max={this.state.max} defaultValue={this.state.values}
                       value={this.state.values}
                       onChange={this.onRangeSliderChange} allowCross={false}/>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="lower-val">Lower Bound</InputLabel>
                    <Input id="lower-val" onChange={this.handleChange('lower')} value={this.state.values[0]}/>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="upper-val">Upper Bound</InputLabel>
                    <Input id="lower-val" onChange={this.handleChange('upper')} value={this.state.values[1]}/>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="color-select">Color</InputLabel>
                    <Select
                        native
                        value={this.state.color}
                        onChange={this.handleChange('color')}
                        input={<Input id="color-select"/>}
                    >
                        {COLORS.map((color) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="colorMode">Style Mode</InputLabel>
                    <Select
                        native
                        value={this.state.styleMode}
                        onChange={this.handleChange('styleMode')}
                        input={<Input id="colorMode"/>}
                    >
                        <option value={'fill'}>Fill</option>
                        <option value={'line'}>Outline</option>

                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default RangeStyleMenu