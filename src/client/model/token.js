// @flow

import { Record } from 'immutable';
import ApiService from '../api/apiService';
import { API } from '../../server/routes/PATH';
import { V1 } from '../../server/routes/api/VERSIONS';
import { TOKENS } from '../../server/routes/api/v1/ENDPOINT';
import type { _token as _tokenFetched } from '../../server/routes/api/v1/tokens/types';

export type _token = {
  data: ?_tokenFetched,
  fetching: boolean,
};

export const defaultValues: _token = {
  data: null,
  fetching: false,
};

const TokenRecord = Record(defaultValues);

export default class Token extends TokenRecord<_token> {
  beforeFetch() {
    return this.set('fetching', true);
  }

  async fetch(id: string) {
    try {
      const data = await ApiService.getJson(`${API + V1 + TOKENS}/${id}`);
      return this.set('fetching', false).set('data', data);
    } catch (e) {
      return this.set('fetching', false).set('data', null);
    }
  }
}
