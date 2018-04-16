import React, {Component} from 'react';
import {connect} from 'react-redux'

/* Material UI Components */
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {DialogTitle, DialogContent, DialogActions} from 'material-ui/Dialog';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Slide from 'material-ui/transitions/Slide'
import Tooltip from 'material-ui/Tooltip'

/* Material UI Icons */
import {default as MapIcon} from 'material-ui-icons/Map';

/* Style Menus */
import CategoryStyleMenu from '../components/map/styleMenus/CategoryStyleMenu';
import ChoroplethStyleMenu from '../components/map/styleMenus/ChoroplethStyleMenu';
import RangeStyleMenu from '../components/map/styleMenus/RangeStyleMenu';

/* Custom Components */
import DatasetFieldSelectionGroup from '../components/map/DatasetFieldSelectionGroup'

/* Functions */
import {dataSource, GeoTypes, LayerTypes} from "../utils/mapDefaults";
import {generateLegendInfo, getFieldValues} from '../utils/mapUtils';
import {arraysAreDifferent, COLORS, guid} from "../utils/dataUtils";

import {StyleMenuEditModes} from "../utils/mapDefaults";
import {addMapLayer, updateMapLayer} from "../actions/mapLayerActions";
import {closeCustomStyleMenu} from "../actions/layerEditorActions";
import DelayedMountDialog from "../components/DelayedMountDialog";

const style = {
  dialog: {},
  content: {
    paddingTop: '16px'
  }
};


const DEFAULT_STATE = {
  styleMode: 'category',
  geometry: 'parcel_boundary',    // currently not used

  dataset: null,                  // Carto dataset
  field: null,                    // field in carto dataset
  fieldValues: null,              // possible values of field in carto dataset

  availableDatasets: [],          // for menus
  availableFields: [],            // available fields for state.dataset, for menus

  styleInfo: {sql: '', css: ''},  // SQL and CSS that define a carto style - is lifted up to map on submit
  layerName: '',
  colorMode: 'fill',
  submenuStates: {category: null, choropleth: null, range: null}
}

class MapStyleMenu extends Component {
  /**
   * Menu used to add custom style layer to map.
   *
   * @param props - open: is this dialog open;
   *                handleRequestClose: run when closing dialog
   *                updateStyleLayer: function that updates the attached CartoMapLayer
   */
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE

  }


  /**
   * Update State with available datasets
   * @private
   */
  _getAvailableDatasets = () => {
    const styleType = this.state.styleMode;
    let availableDatasets = dataSource.getDatasets();

    // Filter out datasets that have no fields that accommodate the style type
    switch (styleType) {
      case 'category':
        availableDatasets = availableDatasets.filter((dataset) =>
          dataSource.accommodatesType(dataset.id, 'category'));
        break;
      case 'choropleth':
      case 'range':
        availableDatasets = availableDatasets.filter((dataset) =>
          dataSource.accommodatesType(dataset.id, 'numeric'));
        break;
    }
    availableDatasets.sort();
    let defaultDataset = availableDatasets[0];

    this.setState(
      {
        availableDatasets: availableDatasets,
        dataset: defaultDataset,
      },
      // Proceed to get the available fields for the default dataset
      this._getAvailableFields(defaultDataset));
  };

  /**
   * Update State with available fields from `dataset`
   * @param {obj} dataset - carto dataset
   * @private
   */
  _getAvailableFields = dataset => {
    const styleType = this.state.styleMode;
    let fields = [],
      currentField = null;

    // Filter fields based on style method
    switch (styleType) {
      case 'category':
        fields = dataset.fields.filter((field) => field.type === 'category');
        break;
      case 'choropleth':
      case 'range':
        fields = dataset.fields.filter((field) => field.type === 'numeric');
        break;
      default:
        fields = dataset.fields;
    }

    fields.sort()
    // Currently just using the first field as the default one.
    currentField = fields[0];

    this.setState(
      {
        availableFields: fields,
        field: currentField,
      },
      // Now that there's a new field, get the possible values from it using `_getFieldValues`
      // which will also save those values to the state.
      () => this._getFieldValues(dataset, currentField)
    )
  };

  /**
   * Collects possible values for `field` of Carto `dataset` adds them to the state.
   * @param {string} dataset - id of carto dataset
   * @param {string} field - name of field in `dataset`
   * @private
   */
  _getFieldValues = (dataset, field) => {
    getFieldValues(dataset, field, this.state.styleMode)
      .then((newOptions) => {
          newOptions.sort();
          this.setState({fieldValues: newOptions})
        },
        (err) => {
          console.log(err)
        })
  };


  /**
   * Updates the saved state of submenu.
   * @param submenuState - current state of submenu
   */
  updateSubmenuSavedState = submenu => submenuState => {
    this.setState({
      submenuStates: Object.assign({}, this.state.submenuStates,
        {
          [submenu]: submenuState
        })
    })
  };


  /**
   * When tab is clicked, change it in state, and update available Selects.
   * @param e
   * @param value
   */
  handleTabChange = (e, value) => {
    this.setState(
      {styleMode: value},

      // Since some fields are only applicable for certain style methods
      // (e.g. strings only for 'category'; impractical to use numbers for 'category')
      // and some datasets might not have any of said applicable fields, we need to reconfigure
      // what datasets and fields and fieldValues are available
      () => {
        this._getAvailableDatasets()
      }
    )
  };


  /**
   * Runs when data source (dataset, field) dropdowns are changed.
   * @param name
   */
  handleDataSourceMenuChange = name => event => {
    if (name === 'dataset') {
      // Update dataset
      let newDataset = dataSource.getDataset(event.target.value);
      this.setState(
        {dataset: newDataset},
        () => {
          // And then get new available the fields,
          // which will also set the currently-selected field and it's possible values.
          this._getAvailableFields(newDataset)
        }
      );

    }
    else if (name === 'field') {
      // Get new field
      let newField = dataSource.getField(this.state.dataset.id, event.target.value);

      // Update field in state
      this.setState(
        {field: newField},
        //And then get available values for that field,
        // which will also set the possible values
        () => {
          this._getFieldValues(this.state.dataset, this.state.field)
        }
      );
    }

  };


  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  };

  /**
   * Passed to children components that provide menus to define the style.
   * They, in turn, use this function to update this component's `styleInfo` state.
   * NOTE: SQL and CSS state is kept in this component and not children, since this component
   * has the style submission button.  Children components are just for defining sql and css.
   * @param sql
   * @param css
   */
  handleStyleInfoChange = (sql, css) => {

    this.setState({styleInfo: {sql: sql, css: css}})
  };

  handleSubmit = (editMode) => () => {
    const {layerId, submitMenu, closeMenu} = this.props;
    submitMenu(editMode, this.state, layerId);
    closeMenu();
  }


  /**
   *  Runs before new props are processed.
   * @param nextProps
   */
  componentWillReceiveProps = nextProps => {
    const {layerData, isOpen} = nextProps;
    const wasOpen = this.props.isOpen;

    // Freshly opened so re-init.  This is in place eof did mount, since this only mounts once as of now
    if (isOpen && !wasOpen) {
      // Check if a saved state was provided (for updating a previously-made layer)
      if (layerData) {
        this.setState(Object.assign({}, layerData.menuState, {styleInfo: layerData.styleInfo}));
      } else {
        this.setState({submenuStates: {category: null, choropleth: null, range: null}})
        this._getAvailableDatasets();
      }
    }
  };

  /**
   * When the component mounts, get the datasets, which then gets the fields,
   * which in turn gets the possible values for said field in said dataset.
   */
  componentDidMount() {
    this._getAvailableDatasets();
  }


  render() {
    const {
      isOpen,
      editMode,
      layerId,
      layerData,
      closeMenu
    } = this.props;

    const {
      styleMode,
      dataset,
      field,
      availableDatasets,
      availableFields,
      fieldValues,
      submenuStates,
      layerName
    } = this.state;


    return (
      <Dialog
        transition={Slide}
        style={style.dialog}
        open={isOpen}
        onClose={closeMenu}>

        <AppBar position="static" color="default">
          <DialogTitle>Add Style to the Map</DialogTitle>
          <Tabs fullWidth
                value={styleMode}
                onChange={this.handleTabChange}
                indicatorColor="primary" textColor="primary"
          >
            <Tab value="category" label="Category"/>
            <Tab value="choropleth" label="Choropleth"/>
            <Tab value="range" label="Range"/>
          </Tabs>
        </AppBar>


        <DialogContent style={style.content}>
          <DatasetFieldSelectionGroup currentDataset={dataset} currentField={field}
                                      handleChange={this.handleDataSourceMenuChange}
                                      availableDatasets={availableDatasets}
                                      availableFields={availableFields}
          />
          <br/>
          {styleMode === 'category' &&
          < CategoryStyleMenu dataset={dataset}
                              field={field}
                              fieldValues={fieldValues}
                              handleStyleInfoChange={this.handleStyleInfoChange}
                              updateSavedState={this.updateSubmenuSavedState('category')}
                              savedState={submenuStates.category}
          />}
          {styleMode === 'choropleth' &&
          <ChoroplethStyleMenu
            dataset={dataset}
            field={field}
            handleStyleInfoChange={this.handleStyleInfoChange}
            updateSavedState={this.updateSubmenuSavedState('choropleth')}
            savedState={submenuStates.choropleth}
          />
          }
          {styleMode === 'range' &&
          <RangeStyleMenu
            dataset={dataset}
            field={field}
            handleStyleInfoChange={this.handleStyleInfoChange}
            updateSavedState={this.updateSubmenuSavedState('range')}
            savedState={submenuStates.range}
          />
          }
        </DialogContent>

        <DialogActions>
          <TextField
            id="layerNameField"
            label="Layer Name (optional)"
            value={layerName}
            placeholder="My Style Name"
            onChange={this.handleChange('layerName')}
            margin="dense"
          />
          <Button color="secondary" onClick={closeMenu}>Cancel</Button>
          <Button color="primary" onClick={this.handleSubmit(editMode, this.state)}>
            Put Some Style on It!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const {isOpen, editMode, layerId, layerData} = state.customStyleMenu;
  return {isOpen, editMode, layerId, layerData}
};

const mapDispatchToProps = dispatch => {
  return {
    submitMenu: (editMode, menuState, layerId) => {
      // Map menu state to layerData object
      const layerData = {
        layerType: LayerTypes.CUSTOM,
        layerName: menuState.layerName || (`${menuState.dataset.name} - ${menuState.field.name}`),
        styleInfo: menuState.styleInfo,
        legendInfo: generateLegendInfo(GeoTypes.POLYGON, LayerTypes.CUSTOM, menuState),
        menuState,
      };


      // If ADD, create new layer and load state into it
      switch (editMode) {
        case StyleMenuEditModes.ADD:
          layerId = guid();
          dispatch(addMapLayer(layerId, layerData));
          break;
        case StyleMenuEditModes.UPDATE:
          dispatch(updateMapLayer(layerId, layerData));
          break;
      }
    },
    closeMenu: () => {
      dispatch(closeCustomStyleMenu())
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(MapStyleMenu);