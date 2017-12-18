import React from 'react';

import List from 'material-ui/List'
import LayerListItem from './LayerListItem'
import AddLayerListItem from './AddLayerListItem'
import BasemapListItem from "./BasemapListItem";
import Divider from 'material-ui/Divider';
import {LayerTypes, StyleMenuEditModes} from "../../utils/mapDefaults";

const LayerList = props => {
    const {
        mapLayerList,
        mapLayersById,
        handleAddLayer,
        handleOpenEditMenu,
        handleDeleteLayer
    } = props;

    return (
        <List>
            <AddLayerListItem onClick={handleAddLayer}/>

            {mapLayerList.slice().reverse().map(layerId => {
                const {layerType, layerName} = mapLayersById[layerId];

                return (
                    <LayerListItem
                        key={layerId}
                        layerType={layerType}
                        layerName={layerName}
                        handleOpenEditMenu={handleOpenEditMenu(mapLayersById,layerId)}
                        handleDelete={handleDeleteLayer(layerId)}
                    />
                )
            })}


            <Divider/>
            <BasemapListItem/>

        </List>
    )
};


export default LayerList;