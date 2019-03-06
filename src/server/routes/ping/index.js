// @flow
import type { $Request as _Request, $Response as _Response } from 'express';
import { Router } from 'express';
import { OK } from '../../../universal/http/HTTP_STATUS';

const router = Router();

router.get('/', (req: _Request, res: _Response) => {
  res.sendStatus(OK);
});

export default router;
