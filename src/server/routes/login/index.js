/* eslint-disable global-require */
// @flow

// -- for mock
import jwt from 'jsonwebtoken';
import { jwt as jwtSetting } from 'config';
// -- for mock

import type { $Request as _Request, $Response as _Response } from 'express';
import Joi from 'joi';
import { Router } from 'express';
import {
  OK,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from '../../../universal/http/HTTP_STATUS';
import createError from '../error/errorService';
import type { _loginBody } from './type';
// import xyzApiService from '../../api/XYZ/xyzApiService';

const router = Router();

const schema = {
  message: Joi.string().required(),
  signature: Joi.string().required(),
  ethereum_address: Joi.string().required(),
  onetime_message: Joi.string().required(),
};

router.post('/', async (req: _Request, res: _Response) => {
  const { body }: { body: _loginBody } = req;
  const { error } = Joi.validate(body, schema);

  if (error !== null) {
    res.status(BAD_REQUEST).json(createError(error.details[0].message));
    return;
  }

  // comment out to manipulate the result
  /*  const reqBody: _loginBody = {
      message: body.message,
      signature: body.signature,
      ethereum_address: body.ethereum_address,
      onetime_message: body.onetime_message,
    }; */

  try {
    // comment out to manipulate the result
    // const result = await xyzApiService.postJson('/login', reqBody, null);

    // mock access token
    const token = jwt.sign('dummy token', jwtSetting.secret);

    res.status(OK).send({ token });
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).json(createError(e.message));
  }
});

export default router;
