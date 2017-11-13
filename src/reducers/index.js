import {combineReducers} from 'redux';

import * as mapReducers from './mapReducers'
import * as parcelDataReducers from './parcelDataReducers'

const allReducers = Object.assign({}, mapReducers, parcelDataReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer