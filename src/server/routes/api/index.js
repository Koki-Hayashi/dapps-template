// @flow

import { Router } from 'express';

import { V1 } from './VERSIONS';
import v1 from './v1';

import noMatchMiddleware from './noMatchMiddleware';

const router = Router();

router.use(V1, v1);

// any request for the path under /api/* shouldn't be handled here
// otherwise the spa html file will be returned by following process.
router.use('/', noMatchMiddleware);

export default router;
