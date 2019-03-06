// @flow

import web3Service from './web3Registry';

export default async function isLoggedIn(): Promise<boolean> {
  const web3 = web3Service.getMetaMaskWeb3();
  if (!web3) {
    return Promise.resolve(false);
  }
  // $FlowFixMe
  const accounts = await web3.eth.getAccounts();
  return Promise.resolve(accounts.length > 0);
}
