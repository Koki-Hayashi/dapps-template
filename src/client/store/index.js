// @flow

/*
* To avoid an unintentional circular dependency, shouldn't get store by importing this module, but
* to use getStore of StoreRegistry instead.
*/
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { routerReducer } from 'react-router-redux';

import * as reducers from '../module/reducers';

const reducer = combineReducers({
  // all reducers are combined into one reducer
  ...reducers,
  routing: routerReducer,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
