// @flow

import type { Dispatch as _Dispatch } from 'redux';

import createAction from './actionCreatorService';
import { getTokensModel } from '../store/modelService';
import Tokens from '../model/tokens';
import type { _plainActionObj } from './actionCreatorService';

const ACTION = Symbol('TOKENS');

/**
 * Actions
 */
export const fetch = () =>
  function(dispatch: _Dispatch<_plainActionObj>) {
    console.log('ffe');
    console.log(getTokensModel());
    const beforeFetch = getTokensModel().beforeFetch();

    console.log('ffe2');
    console.log(beforeFetch);

    dispatch(createAction(ACTION, beforeFetch));

    return beforeFetch
      .fetch()
      .then(model => {
        console.log('model');
        console.log(model);
        dispatch(createAction(ACTION, model));
      })
      .catch(error => {
        console.log('error');
        console.log(error);
        dispatch(createAction(ACTION, error));
      });
  };

/**
 * Reducer
 */
export default function update(
  state: Tokens = new Tokens(),
  action: _plainActionObj
) {
  if (ACTION === action.type) {
    return action.model;
  }

  return state;
}
