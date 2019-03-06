/* eslint-disable import/prefer-default-export */
import { login } from 'config';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(login.storageKey);
  if (!accessToken) {
    return '';
  }

  return accessToken;
};
