import {combineReducers} from 'redux';

import * as mapReducers from './mapReducers'
import * as parcelDataReducers from './parcelDataReducers'
import * as layerEditorReducers from './layerEditorReducers'
import * as mapLayerReducers from './mapLayerReducers'

const allReducers = Object.assign({}, mapReducers, parcelDataReducers, layerEditorReducers, mapLayerReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer