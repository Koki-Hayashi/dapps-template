/* eslint-disable import/prefer-default-export */
// @flow

import jwt from 'jsonwebtoken';
import { jwt as jwtSetting } from 'config';

function generateAccessToken(
  ethAddress: string,
  expiry: number,
  organizationId: string
): string {
  return jwt.sign(
    {
      ethereum_address: ethAddress,
      exp: expiry,
      organization: organizationId,
    },
    jwtSetting.secret
  );
}

export function generateValidAccressToken(
  ethAddress: string = '0x76AF3fa74BCbB01a027Db95ee5d7Ee3f9Ba4FaDb',
  organizationId: string = 'xyz'
): string {
  const nowTime = parseInt(new Date().getTime() / 1000, 10);
  return generateAccessToken(ethAddress, nowTime + 1000, organizationId);
}

export function generateInvalidAccressToken(
  ethAddress: string = '0x76AF3fa74BCbB01a027Db95ee5d7Ee3f9Ba4FaDb',
  organizationId: string = 'xyz'
): string {
  const nowTime = parseInt(new Date().getTime() / 1000, 10);
  return generateAccessToken(ethAddress, nowTime - 1000, organizationId);
}
