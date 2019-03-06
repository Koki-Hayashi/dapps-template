// @flow

import { Router } from 'express';
import { TOKENS } from './ENDPOINT';

import tokens from './tokens';

const router = Router();

router.use(TOKENS, tokens);

export default router;
