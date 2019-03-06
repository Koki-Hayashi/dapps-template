/* eslint-disable import/prefer-default-export */
// @flow

import jwt from 'jsonwebtoken';
import { jwt as jwtSetting } from 'config';
import type { $Request as _Request } from 'express';
import { AUTHORIZATION, BEARER_PREFIX } from '../../universal/api/consts';

function getDecodedToken(req: _Request) {
  const authHeader = req.get(AUTHORIZATION);
  if (!authHeader || !authHeader.includes(BEARER_PREFIX)) {
    return '';
  }
  const accessToken = authHeader.split(BEARER_PREFIX)[1];
  if (!accessToken) {
    return '';
  }

  try {
    return jwt.verify(accessToken, jwtSetting.secret);
  } catch (e) {
    return '';
  }
}

export function isValidAccess(req: _Request): boolean {
  // mock result
  return true;

  // comment out to manipulate the result
  /*
  const decoded = getDecodedToken(req);


    if (!decoded) {
      return false;
    }

  return decoded.exp > new Date().getTime() / 1000;
*/
}
