// @flow

// 2xx
export const OK: number = 200;
export const CREATED: number = 201;
export const NO_CONTENT: number = 204;

// 4xx
export const BAD_REQUEST: number = 400;
export const NOT_AUTHORIZED: number = 401;

// 5xx
export const INTERNAL_SERVER_ERROR: number = 500;

export default {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_AUTHORIZED,
  INTERNAL_SERVER_ERROR,
};
