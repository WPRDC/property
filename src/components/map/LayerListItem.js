import React from 'react'
import PropTypes from 'prop-types'

import {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import LayersIcon from 'material-ui-icons/Layers'
import DeleteIcon from 'material-ui-icons/Delete'

import Avatar from 'material-ui/Avatar';

import {SortableElement} from 'react-sortable-hoc';


const LayerListItem = props => {
  const {layerType, layerName, handleOpenEditMenu, handleDelete} = props;

  return (
    <ListItem button onClick={handleOpenEditMenu} className='sortableElement'>
      <ListItemAvatar>
        <Avatar>
          <LayersIcon/>
        </Avatar>
      </ListItemAvatar>

      <ListItemText primary={layerType} secondary={layerName}/>

      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={handleDelete}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};


export default SortableElement(LayerListItem)