// @flow

import { Record } from 'immutable';
import ApiService from '../api/apiService';
import { API } from '../../server/routes/PATH';
import { V1 } from '../../server/routes/api/VERSIONS';
import { TOKENS } from '../../server/routes/api/v1/ENDPOINT';
import type { _token } from '../../server/routes/api/v1/tokens/types';

export type _tokens = {
  data: Array<_token>,
  fetching: boolean,
};

export const defaultValues: _tokens = {
  data: [],
  fetching: false,
};

const TokenRecord = Record(defaultValues);

export default class Tokens extends TokenRecord<_tokens> {
  beforeFetch() {
    return this.set('fetching', true);
  }

  async fetch() {
    try {
      const data = await ApiService.getJson(API + V1 + TOKENS);
      return this.set('fetching', false).set('data', data);
    } catch (e) {
      return this.set('fetching', false).set('data', []);
    }
  }
}
