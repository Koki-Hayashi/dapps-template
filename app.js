import 'dotenv/config'; // To enable environment value injection to config file, this MUST be placed prior to importing config.
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import { PING, API, LOGIN, ONETIME_MESSAGE } from './src/server/routes/PATH';

import pingController from './src/server/routes/ping';
import apiController from './src/server/routes/api/index';
import onetimeMessageController from './src/server/routes/onetimeMessage';
import loginController from './src/server/routes/login';
import spaController from './src/server/routes/index';
import authMiddleware from './src/server/auth/authMiddleware';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(PING, pingController);
app.use(ONETIME_MESSAGE, onetimeMessageController);
app.use(LOGIN, loginController);
app.use(API, authMiddleware, apiController);
app.use('*', spaController); // everything else even not found will be handled by client side SPA

export default app;
