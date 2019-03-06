// @flow

import jwt from 'jsonwebtoken';
import type { Dispatch as _Dispatch } from 'redux';
import { login as loginConfig } from 'config';
import {
  updateDisableBack,
  updateStatus,
} from '../../module/metamaskLoginModule';
import {
  LOGIN_ERROR,
  NO_LOGIN,
  NO_META_MASK,
  SUCCESS,
  VERIFYING,
  WAITING_SIGN,
} from '../../model/metaMaskLogin';
import web3Service from '../../web3/web3Registry';
import ApiService from '../../api/apiService';
import type { _plainActionObj } from '../../module/actionCreatorService';

const requestOnetimeMessage = async (): Promise<string> => {
  try {
    const res = await ApiService.getJson('/onetime_message', null);

    return Promise.resolve(res.message);
  } catch (e) {
    throw new Error(e.message);
  }
};

const requestAccessToken = async (
  signature: string,
  message: string,
  ethereumAddress: string,
  onetimeMessage: string
): Promise<string> => {
  try {
    const res = await ApiService.postJson('/login', {
      signature,
      ethereum_address: ethereumAddress,
      message,
      onetime_message: onetimeMessage,
    });

    return Promise.resolve(res.token);
  } catch (e) {
    throw new Error(e.message);
  }
};

const signMessage = async (
  web3: any,
  message: string,
  account: string
): Promise<string> => {
  try {
    const msgHash = web3.utils.sha3(message);
    return await web3.eth.sign(msgHash, account);
  } catch (e) {
    throw e;
  }
};

const isMetaMaskNotSetup = (web3): boolean => !web3;

export const loginWithMetaMask = () => async (
  dispatch: _Dispatch<_plainActionObj>
) => {
  const web3 = web3Service.getMetaMaskWeb3();
  if (isMetaMaskNotSetup(web3)) {
    dispatch(updateStatus(NO_META_MASK));
    return;
  }

  // $FlowFixMe
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    // which means MetaMask is locked.
    dispatch(updateStatus(NO_LOGIN));
    return;
  }
  try {
    const onetimeMessage = await requestOnetimeMessage();
    const message = jwt.decode(onetimeMessage);

    dispatch(updateStatus(WAITING_SIGN));
    dispatch(updateDisableBack(true));

    const accountSmallCase = accounts[0].toLowerCase(); // Ethereum Address Validator can handle only an address which consists of only small chars
    const sign = await signMessage(web3, message, accountSmallCase);

    dispatch(updateStatus(VERIFYING));
    const accessToken: string = await requestAccessToken(
      sign,
      message,
      accountSmallCase,
      onetimeMessage
    );

    if (!accessToken) {
      dispatch(updateStatus(LOGIN_ERROR));
      return;
    }

    localStorage.setItem(loginConfig.storageKey, accessToken);
    dispatch(updateStatus(SUCCESS));
  } catch (e) {
    dispatch(updateStatus(LOGIN_ERROR));
  } finally {
    dispatch(updateDisableBack(false));
  }
};

export default loginWithMetaMask;
