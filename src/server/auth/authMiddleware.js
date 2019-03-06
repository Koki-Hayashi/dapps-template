// @flow
import type {
  $Request as _Request,
  $Response as _Response,
  NextFunction as _NextFunction,
} from 'express';
import { NOT_AUTHORIZED } from '../../universal/http/HTTP_STATUS';
import createError from '../routes/error/errorService';

import { isValidAccess } from '../util/jwtHandler';

const authCheck = (req: _Request, res: _Response, next: _NextFunction) => {
  if (isValidAccess(req)) {
    next();
  } else {
    res.status(NOT_AUTHORIZED).send(createError('Failed to verify token'));
  }
};

export default authCheck;
