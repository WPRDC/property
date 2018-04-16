import React from 'react'
import {connect} from 'react-redux'
import Legend from '../components/map/Legend'

const mapStateToProps = state => {
  const {mapLayerList, mapLayersById} = state;
  return {mapLayerList, mapLayersById}
}

const PopulatedLegend = connect(mapStateToProps)(Legend);

export default PopulatedLegend