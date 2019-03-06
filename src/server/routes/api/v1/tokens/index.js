// @flow

import Joi from 'joi';
import type { $Request as _Request, $Response as _Response } from 'express';
import { Router } from 'express';
import { BAD_REQUEST, OK } from '../../../../../universal/http/HTTP_STATUS';
import type { _token } from './types';
import logger from '../../../../logger';
import createError from '../../../error/errorService';
// import xyzApiService from '../../../../api/XYZ/xyzApiService';

const router = Router();

const handleError = (res: _Response, e, message) => {
  logger.error(e);
  res.status(BAD_REQUEST).json(createError(message));
};

const mockTokens: Array<_token> = [
  { id: '1', name: 'Token1', symbol: 'T1' },
  { id: '2', name: 'Token2', symbol: 'T2' },
];

router.get('/', async (req: _Request, res: _Response) => {
  // -- comment out for mocking
  /*
    const tokens = await xyzApiService.getJson('/tokens', {
      organization_id: organizationId,
    });
  */
  // -- comment out for mocking

  res.status(OK).send(mockTokens);
});

router.get('/:id', async (req: _Request, res: _Response) => {
  const { id } = req.params;

  const { error } = Joi.validate(id, Joi.string().required());
  if (error) {
    handleError(res, error, "parameter 'id' is invalid");
    return;
  }
  // -- comment out for mocking
  // const token = await xyzApiService.getJson(`/tokens/${id}`);
  // -- comment out for mocking

  // mock result
  const mockToken = mockTokens[Number(id)];
  if (!mockToken) {
    res.status(BAD_REQUEST).json(createError(`no token with id:${id} exists`));
  }

  res.status(OK).send(mockToken);
});

export default router;
