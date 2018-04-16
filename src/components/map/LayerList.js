import React from 'react';

import List from 'material-ui/List'
import LayerListItem from './LayerListItem'
import Divider from 'material-ui/Divider';
import {LayerTypes, StyleMenuEditModes} from "../../utils/mapDefaults";
import {SortableContainer} from 'react-sortable-hoc';
import {limitString, sentenceCase} from "../../utils/dataUtils";


const LayerList = props => {
  const {
    mapLayerList,
    mapLayersById,
    handleAddLayer,
    handleOpenEditMenu,
    handleDeleteLayer,
    onSortEnd
  } = props;

  return (
    <List>
      {mapLayerList.slice().reverse().map((layerId, idx) => {
        const {legendInfo, layerName} = mapLayersById[layerId];
        //const displayedLayerType = (layerType === 'HIGHLIGHT' ? 'Highlight' : )
        return (
          <LayerListItem
            key={layerId}
            index={idx}
            layerType={sentenceCase(legendInfo.styleType) + ' Layer'}
            layerName={limitString(layerName, 28)}
            handleOpenEditMenu={handleOpenEditMenu(mapLayersById, layerId)}
            handleDelete={handleDeleteLayer(layerId)}
          />
        )
      })}
    </List>
  )
};


export default SortableContainer(LayerList)