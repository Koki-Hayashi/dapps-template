// @flow

import type { Dispatch as _Dispatch } from 'redux';

import createAction from './actionCreatorService';
import { getTokenModel } from '../store/modelService';
import Token from '../model/token';
import type { _plainActionObj } from './actionCreatorService';

const ACTION = 'TOKEN';

/**
 * Actions
 */
export const fetch = (id: string) => (dispatch: _Dispatch<_plainActionObj>) => {
  const beforeFetch = getTokenModel().beforeFetch();
  dispatch(createAction(ACTION, beforeFetch));

  return beforeFetch
    .fetch(id)
    .then(model => {
      dispatch(createAction(ACTION, model));
    })
    .catch(error => {
      dispatch(createAction(ACTION, error));
    });
};

/**
 * Reducer
 */
export default function update(
  state: Token = new Token(),
  action: _plainActionObj
) {
  if (ACTION === action.type) {
    return action.model;
  }

  return state;
}
