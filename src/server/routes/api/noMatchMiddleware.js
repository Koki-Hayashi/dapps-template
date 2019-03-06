// @flow
import type { $Request as _Request, $Response as _Response } from 'express';

import { BAD_REQUEST } from '../../../universal/http/HTTP_STATUS';

import logger from '../../logger';
import createError from '../error/errorService';

const authCheck = (req: _Request, res: _Response) => {
  const { originalUrl } = req;

  logger.info(`There is no endpoint matching for: ${originalUrl}`);
  res
    .status(BAD_REQUEST)
    .send(createError(`no endpoint existing: ${originalUrl}`));
};

export default authCheck;
