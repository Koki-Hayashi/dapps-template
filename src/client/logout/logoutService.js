// @flow

import { login as loginConfig } from 'config';
import { redirect } from '../redirect/redirectService';
import { LOGIN } from '../pages/PAGE_ENUM';

export default function logout() {
  localStorage.removeItem(loginConfig.storageKey);

  redirect(LOGIN);
}
