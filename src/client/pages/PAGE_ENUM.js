// @flow

/*
* These enums are suppose to be passed to <Router/> from react-router-dom, which means have to have path and component property.
*/
import * as React from 'react';

import Login from './login';
import Tokens from './tokens';
import TokenDetail from './token';
import NotFound from './NotFound';

export type _pageEnum = {
  title: string,
  path: string,
  component: React.ComponentType<any> | (Function => React.Node),
};

export const LOGIN: _pageEnum = {
  title: 'Login',
  path: '/',
  component: Login,
};

export const TOKENS: _pageEnum = {
  title: 'Tokens',
  path: '/tokens',
  component: Tokens,
};

export const TOKEN_DETAIL: _pageEnum = {
  title: 'Token detail',
  path: '/tokens/:id',
  reg: new RegExp('^/tokens/[^/]+$'),
  component: TokenDetail,
};

export const NOT_FOUND: _pageEnum = {
  title: 'Not found',
  path: '*',
  component: NotFound,
};

export default {
  LOGIN,
  TOKENS,
  TOKEN_DETAIL,
  NOT_FOUND,
};
