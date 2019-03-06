/* eslint-disable no-undef */

import { login } from 'config';
import { getAccessToken } from '../../api/util';

describe('getAccessToken', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('returns empty string when no access token is stored', () => {
    const result = getAccessToken();

    expect(result).toBe('');
  });

  it('returns accessToken if it is stored', () => {
    const accessToken = 'test';
    localStorage.setItem(login.storageKey, accessToken);

    const result = getAccessToken();

    expect(result).toBe(accessToken);
  });
});
