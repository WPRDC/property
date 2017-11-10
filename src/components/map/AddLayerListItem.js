import React from 'react'
import PropTypes from 'prop-types'

import ListItem, {ListItemAvatar, ListItemSecondaryAction} from 'material-ui/List';
import AddIcon from 'material-ui-icons/Add'
import {green} from 'material-ui/colors'

const style = {
    backgroundColor: green[600]
};

const AddLayerListItem = props => {
    const {handleOnClick} = props;

    return (
        <ListItem button onClick={handleOnClick}>
            <ListItemAvatar>
                <Avatar style={style}>
                    <AddIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"New Style Layer"}/>
        </ListItem>
    );
};

AddLayerListItem.propTypes = {
    handleOnClick: PropTypes.func.isRequired
};

export default AddLayerListItem
