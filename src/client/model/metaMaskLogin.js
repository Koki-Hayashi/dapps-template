// @flow

import { Record } from 'immutable';

export const NEUTRAL = 'NEUTRAL';
export const NO_META_MASK = 'NO_META_MASK';
export const NO_LOGIN = 'NO_LOGIN';
export const WAITING_SIGN = 'WAITING_SIGN';
export const VERIFYING = 'VERIFYING';
export const SUCCESS = 'SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export type _status =
  | 'NEUTRAL'
  | 'NO_META_MASK'
  | 'NO_LOGIN'
  | 'VERIFYING'
  | 'WAITING_SIGN'
  | 'LOGIN_ERROR'
  | 'SUCCESS';

type _metaMaskLogin = {
  status: _status,
  disabledBack: boolean,
};

export const defaultValues: _metaMaskLogin = {
  status: NEUTRAL,
  disabledBack: false,
};

const MetaMaskLoginRecord = Record(defaultValues);

export default class MetaMaskLoginModel extends MetaMaskLoginRecord<
  _metaMaskLogin
> {
  updateStatus(status: _status) {
    return this.set('status', status);
  }

  updateDisableBack(bool: boolean) {
    return this.set('disabledBack', bool);
  }
}
