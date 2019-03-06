/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { jwt as jwtSetting } from 'config';
import type { $Request as _Request } from 'express';
import { AUTHORIZATION, BEARER_PREFIX } from '../../universal/api/consts';

type tokenPayload = {
  ethereum_address: string,
  exp: number,
};

export function getAccessToken(
  req: _Request
): { accessToken: string, error: string } {
  const authHeader = req.get(AUTHORIZATION);

  if (!authHeader || !authHeader.includes(BEARER_PREFIX)) {
    return {
      accessToken: null,
      error: 'Authorization header is missing or wrong format.',
    };
  }

  const accessToken = authHeader.split(BEARER_PREFIX)[1];
  if (!accessToken) {
    return { accessToken: null, error: 'Token is not assigned on the header' };
  }

  return { accessToken, error: null };
}

export function verifyAccessToken(token: string): boolean {
  const decoded: tokenPayload = jwt.verify(token, jwtSetting.secret);
  return decoded.exp > new Date().getTime() / 1000;
}

export function generateAccessToken(
  ethAddress: string,
  expiry: number
): string {
  return jwt.sign(
    { ethereum_address: ethAddress, exp: expiry },
    jwtSetting.secret
  );
}
