// @flow

import { login } from 'config';

export default function isLoggedIn(): boolean {
  return !!localStorage.getItem(login.storageKey);
}
