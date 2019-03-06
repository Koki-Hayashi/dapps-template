// @flow

import type { _plainActionObj } from './actionCreatorService';
import createAction from './actionCreatorService';
import { getMetaMaskLoginModel } from '../store/modelService';
import type { _status } from '../model/metaMaskLogin';
import MetaMaskLoginModel from '../model/metaMaskLogin';

const ACTION = 'META_MASK_LOGIN';

/**
 * Actions
 */

export const updateStatus = (status: _status) => {
  const updatedModel = getMetaMaskLoginModel().updateStatus(status);
  return createAction(ACTION, updatedModel);
};

export const updateDisableBack = (bool: boolean) => {
  const updatedModel = getMetaMaskLoginModel().updateDisableBack(bool);
  return createAction(ACTION, updatedModel);
};

/**
 * Reducer
 */
export default function reducer(
  state: MetaMaskLoginModel = new MetaMaskLoginModel(),
  action: _plainActionObj
) {
  if (ACTION === action.type) {
    return action.model;
  }

  return state;
}
