import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from  './reducers';
import {Framework7StateKernel, syncFramework7WithStore} from 'framework7-redux';

export const framework7StateKernel = new Framework7StateKernel();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

syncFramework7WithStore(store, framework7StateKernel);