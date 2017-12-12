import {combineReducers} from 'redux';

import * as mapReducers from './mapReducers'
import * as parcelDataReducers from './parcelDataReducers'
import * as styleMenuReducers from './styleMenuReducers'

const allReducers = Object.assign({}, mapReducers, parcelDataReducers, styleMenuReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer