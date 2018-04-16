import React, {Component, PureComponent} from 'react';

/* Material UI Components*/
import Button from 'material-ui/Button'
import List, {ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import LayersIcon from 'material-ui-icons/Layers';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Divider from 'material-ui/Divider';

import ColorPicker from '../../ColorPicker'

import {GithubPicker} from 'react-color';


/* Defaults & Helper Functions */
import {createCategoryCSS, createStyleSQL, COLORS, getFieldValues} from '../../../utils/mapUtils';

const DEFAULT_COLOR = '#11f';

class CategoryStyleMenu extends Component {
  /**
   * Provides menu for defining style based on coloring parcels by category.
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      fieldValues: [],
      menuItems: [],         // List of menu items {'category': '', 'color': ''}
      styleMode: 'fill'
    };
  }

  /**
   * Updates the SQL and cartoCSS that define style on a Carto StyledMap.
   * @private
   */
  _handleStyleInfoChange = () => {
    let sql = createStyleSQL(this.props.dataset, this.props.field);
    let css = createCategoryCSS(this.props.dataset, this.props.field, this.state.menuItems, this.state.styleMode);
    this.props.handleStyleInfoChange(sql, css);
    this._updateSavedState();
  };

  /**
   * Sets `menuItem` to default state. Currently this means setting that category to the first fieldValue and color
   * to the default color
   *
   * @param {array} fieldValues - possible values for field being styled
   * @private
   */
  _initMenuItems = () => {
    const {dataset, field} = this.props;
    getFieldValues(dataset, field)
      .then(fieldValues => {
        this.setState(
          {
            fieldValues,
            menuItems: [{category: fieldValues[0], color: DEFAULT_COLOR}]
          },
          this._handleStyleInfoChange
        )
      })
  };

  /**
   * Replaces menu item at index `targetIdx` with `n
   * @param targetIdx
   * @param field
   * @param value
   * @param callback function to run after setting state
   * @private
   */
  _updateMenuItems = (targetIdx, field, value, callback) => {
    const newMenuItems = this.state.menuItems.map((menuItem, currentIdx) => {
      if (targetIdx !== currentIdx) {
        return menuItem;
      } else {
        // update menuItem with new value for field
        return {...menuItem, [field]: value};
      }
    });

    this.setState(
      {menuItems: newMenuItems},
      callback
    )
  };

  _updateSavedState() {
    this.props.updateSavedState(this.state)
  }


  /**
   * Runs when 'add' button is clicked.  Adds a menu item to the menu item list.
   */
  handleAddMenuItem = () => {
    let newMenuItems = this.state.menuItems.concat([{category: this.state.fieldValues[0], color: DEFAULT_COLOR}]);

    this.setState({
      menuItems: newMenuItems
    })
  };

  /**
   * Runs when 'delete' button is clicked.  Removes menu item from list of menu items in state.
   * @param targetIdx
   */
  handleRemoveMenuItem = (targetIdx) => (e) => {
    this.setState({
      menuItems: this.state.menuItems.filter((menuItem, currentIdx) => targetIdx !== currentIdx)
    })
  };

  /**
   * Runs when an menu item is changed
   *
   * @param {string} field - name of field which changed
   * @param {int} targetIdx - index of menu item in `this.state.menuItems` that was changed
   */
  handleChangeMenuItem = (field, targetIdx) => (event) => {
    this._updateMenuItems(targetIdx, field, event.target.value, this._handleStyleInfoChange);
  };


  /**
   * Runs when color is changed
   *
   * @param targetIdx
   */
  handleChangeColor = targetIdx => color => {
    this._updateMenuItems(targetIdx, 'color', color, this._handleStyleInfoChange);
  };


  handleStyleModeChange = event => {
    this.setState({styleMode: event.target.value}, this._handleStyleInfoChange)
  };

  /**
   * Runs when component mounts.  Initializes the menu.
   */
  componentDidMount = () => {
    const {savedState} = this.props;
    if (savedState && Object.keys(savedState).length !== 0) {
      this.setState(savedState)
    } else {
      this._initMenuItems()
    }
  };

  /**
   * Runs when component updates.  Updates style information.
   */
  componentDidUpdate = (prevProps, prevState) => {
    // First check if anything pertaining to updating the style has changed.
    if (prevProps.dataset !== this.props.dataset ||
      prevProps.field !== this.props.field
    ) {
      this._initMenuItems();
    } else if (prevState.menuItems.length !== this.state.menuItems.length) {
      this._handleStyleInfoChange();
    }
  };

  render() {
    return (
      <div>
        <List>
          {this.state.menuItems.map((menuItem, idx) =>
            <ListItem key={idx.toString()}>
              <ListItemAvatar>
                <Avatar><LayersIcon/></Avatar>
              </ListItemAvatar>
              <ListItemText primary={
                <CategorySelectionLine
                  itemIdx={idx}
                  menuItem={menuItem}
                  categoryOptions={this.state.fieldValues}
                  handleChangeSelect={this.handleChangeMenuItem}
                  handleChangeColor={this.handleChangeColor}
                />
              }/>
              <ListItemSecondaryAction>
                <IconButton onClick={this.handleRemoveMenuItem(idx)}>
                  <RemoveCircleIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
          <Divider/>
          <ListItem button onClick={this.handleAddMenuItem}>
            <ListItemAvatar>
              <Avatar>
                <AddCircleIcon/>
              </Avatar>

            </ListItemAvatar>
            <ListItemText primary={'Add Another Category'}/>
          </ListItem>
        </List>
        <FormControl>
          <InputLabel htmlFor="colorMode">Style Mode</InputLabel>
          <Select
            native
            value={this.state.styleMode}
            onChange={this.handleStyleModeChange}
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


/**
 * Line that has a category-color pair for styling the map by category
 *
 * @param props
 * @return {XML} <ListItem> containing <Selects> for category and color
 * @constructor
 */
const CategorySelectionLine = props => {
  const {
    menuItem, categoryOptions, itemIdx,
    handleChangeSelect, handleChangeColor
  } = props;
  return (
    <div>
      <FormControl>
        <Select native value={menuItem.category}
                onChange={handleChangeSelect('category', itemIdx)}
                input={<Input id={'category-value-' + itemIdx}/>}
        >
          {categoryOptions.map((opt, optionIdx) => (
            <option key={optionIdx.toString()}
                    value={categoryOptions[optionIdx]}>{categoryOptions[optionIdx]}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <ColorPicker color={menuItem.color} onChange={handleChangeColor(itemIdx)}/>
      </FormControl>
    </div>
  );
};


export default CategoryStyleMenu;