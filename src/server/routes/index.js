// @flow
import type { $Request as _Request, $Response as _Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', (req: _Request, res: _Response) => {
  res.render('index');
});

export default router;
