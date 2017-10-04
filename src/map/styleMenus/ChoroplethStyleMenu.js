import React, {Component} from 'react';

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

/* Defaults & Helper Functions */
import {mapDatasets} from "../mapDefaults";
import {createCategoryCSS, createStyleSQL} from '../mapUtils';

const COLOR_OPTIONS = ['red', 'blue', 'green', 'yellow', 'black'];
const DEFAULT_COLOR = 'red';


class ChoroplethStyleMenu extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <p>Choropleth</p>
            </div>
        );
    }
}

export default ChoroplethStyleMenu;