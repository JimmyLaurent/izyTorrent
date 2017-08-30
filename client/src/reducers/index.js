import torrentSearch from './torrentSearch';
import torrentList from './torrentList';
import { combineReducers } from 'redux';
import { framework7Reducer } from 'framework7-redux';

const rootReducer = combineReducers({
    framework7: framework7Reducer,
    torrentSearch,
    torrentList
});

export default rootReducer;