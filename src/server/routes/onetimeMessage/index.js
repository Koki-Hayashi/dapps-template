// @flow

// -- for mock
import jwt from 'jsonwebtoken';
import { jwt as jwtSetting } from 'config';
// -- for mock

import type { $Request as _Request, $Response as _Response } from 'express';
import { Router } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from '../../../universal/http/HTTP_STATUS';
import createError from '../error/errorService';
// import xyzApiService from '../../api/XYZ/xyzApiService';

const router = Router();

router.get('/', async (req: _Request, res: _Response) => {
  try {
    // comment out to manipulate the result
    // const result = await xyzApiService.getJson('/onetime_message', null);

    // mock result
    const result = jwt.sign('dummy', jwtSetting.secret);

    res.status(OK).send({ message: result });
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).json(createError(e.message));
  }
});

export default router;
