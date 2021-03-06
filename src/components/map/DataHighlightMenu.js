import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui/styles';

import Dialog, {DialogTitle, DialogContent, DialogContentText, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';

import {closeCustomStyleMenu, closeHighlightStyleMenu} from "../../actions/layerEditorActions";

import ColorPicker from '../ColorPicker'
import {GeoTypes, LayerTypes, StyleMenuEditModes} from "../../utils/mapDefaults";
import {addMapLayer, openMapLayerMenu, updateMapLayer} from "../../actions/mapLayerActions";
import {guid, limitString} from "../../utils/dataUtils";
import DelayedMountDialog from "../DelayedMountDialog";

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})


class DataHighlightMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      range: null,
      color: 'blue',
      selectedIndex: 0,
    }
  }

  _makeStyleInfo = (range, color, makeSql, makeCss) => {
    return {sql: makeSql(range), css: makeCss(color)}
  };

  handleSelectColor = color => {
    this.setState({color})
  };

  handleSubmit = () => {
    const {editMode, layerId, layerData, submitMenu, closeMenu} = this.props;
    const {range, color, selectedIndex} = this.state;
    const {items} = layerData.menuState;
    const {makeSql, makeCss} = items[selectedIndex];

    const styleInfo = this._makeStyleInfo(range, color, makeSql, makeCss);

    // Update menu state to include these things
    const savedState = Object.assign({}, layerData.menuState, {range, color, selectedIndex, styleInfo});

    // Combine props and state into current state of menu for reloading
    submitMenu(editMode, savedState, layerId);
    closeMenu();
  };

  render() {
    const {
      isOpen, layerData,
      closeMenu, handleSelectField
    } = this.props;

    const {color, selectedIndex} = this.state;
    const {dataset, items} = layerData.menuState || {dataset: null, items: null}

    return (
      <Dialog open={isOpen} onClose={closeMenu}>
        <DialogTitle>
          {dataset
            ? dataset.name
            : "Highlight Similar Items"
          }
        </DialogTitle>

        <DialogContent style={{overflow: "none"}}>
          <DialogContentText>
            {`Highlight parcels with similar data.`}
          </DialogContentText>

          <FieldValueMenu items={items} index={selectedIndex} onChange={handleSelectField}>
            <ColorPicker style={{}} color={color} onChange={this.handleSelectColor} triangle={'top-right'}/>
          </FieldValueMenu>

        </DialogContent>
        <DialogActions>
          <Button onClick={closeMenu} color="primary">Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">Highlight</Button>
        </DialogActions>
      </Dialog>

    )
  }
};

const FieldValueMenu = props => {
  const {items, index, onChange, children} = props;
  const {field, value, formatter} = items[index];
  return (
    <div>
      <FormControl>
        <FieldSelect items={items} onChange={onChange}/>
      </FormControl>
      <FormControl>
        {children}
      </FormControl>
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
  const {isOpen, editMode, layerId, layerData} = state.highlightMenu;
  return {isOpen, editMode, layerId, layerData}
};

const mapDispatchToProps = dispatch => {
  return {
    submitMenu: (editMode, menuState, layerId) => {
      // Map menu state to layerData object
      const selectedField = menuState.items[menuState.selectedIndex].field;
      const selectedValue = menuState.items[menuState.selectedIndex].value;
      const layerData = {
        layerType: LayerTypes.HIGHLIGHT,
        layerName: menuState.layerName || (`${menuState.dataset.name} - ${selectedField}`),
        styleInfo: menuState.styleInfo,
        legendInfo: {
          geoType: GeoTypes.POLYGON,
          styleType: 'highlight',
          colorMapping: [{value: `${limitString(selectedValue, 26)}`, color: menuState.color}]
        },
        menuState,
      };

      switch (editMode) {
        case StyleMenuEditModes.ADD:
          layerId = guid();
          dispatch(addMapLayer(layerId, layerData));
          dispatch(openMapLayerMenu());
          break;
        case StyleMenuEditModes.UPDATE:
          dispatch(updateMapLayer(layerId, layerData));
          break;
      }
    },
    closeMenu: () => {
      dispatch(closeHighlightStyleMenu())
    }
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DataHighlightMenu))