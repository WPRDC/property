import React from 'react'
import PropTypes from 'prop-types'

import ListItem, {ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';
import LayersIcon from 'material-ui-icons/Layers'

const LayerListItem = props => {
    const {layer, handleUpdate, handleDelete} = props;

    const primaryText = layer.layerName || layer.currentTab.charAt(0).toUpperCase() + layer.currentTab.slice(1) + " Layer";
    const secondaryText = `${layer.dataset.name}: ${layer.field.name}`;

    return (
        <ListItem button onClick={handleUpdate}>
            <ListItemAvatar>
                <Avatar>
                    <LayersIcon/>
                </Avatar>
            </ListItemAvatar>

            <ListItemText primary={primaryText} secondary={secondaryText}/>

            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={handleDelete}>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

LayerListItem.propTypes = {
    layer: PropTypes.node.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default LayersIcon