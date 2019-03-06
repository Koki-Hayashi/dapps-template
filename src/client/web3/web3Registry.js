/* eslint-disable import/prefer-default-export,class-methods-use-this */
// @flow

// TODO: move url to env(config)
// TODO: use kovan.voltorb ? or metamask provider?
// const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.voltorb-stg.ango.cloud'));
import Web3 from 'web3';

class Web3Registry {
  metaMaskWeb3: Web3;

  setupMetaMaskWeb3() {
    try {
      this.metaMaskWeb3 = new Web3(window.web3.currentProvider);
    } catch (e) {
      this.metaMaskWeb3 = null;
    }
  }

  getMetaMaskWeb3 = (): ?Web3 => {
    if (this.metaMaskWeb3 == null) {
      this.setupMetaMaskWeb3();
    }

    return this.metaMaskWeb3;
  };
}

export default new Web3Registry();
