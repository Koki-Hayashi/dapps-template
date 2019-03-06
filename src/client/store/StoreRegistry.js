// @flow

/*
* To avoid an unintentional circular dependency, should get store by
* this getStore of StoreRegistry.
*/
import type { Store as _store } from 'redux';

class StoreRegistry {
  store: _store<any, any>; // TODO better to have right types

  setStore(store: _store<any, any>) {
    this.store = store;
  }

  getStore() {
    return this.store;
  }
}

export default new StoreRegistry();
