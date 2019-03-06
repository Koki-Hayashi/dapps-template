/* eslint-disable import/prefer-default-export */
// @flow

import StoreRegistry from './StoreRegistry';

import TokensModel from '../model/tokens';
import TokenModel from '../model/token';
import MetaMaskLoginModel from '../model/metaMaskLogin';

export const getMetaMaskLoginModel = (): MetaMaskLoginModel =>
  StoreRegistry.getStore().getState().metaMaskLoginReducer;

export const getTokensModel = (): TokensModel =>
  StoreRegistry.getStore().getState().tokensReducer;

export const getTokenModel = (): TokenModel =>
  StoreRegistry.getStore().getState().tokenReducer;
