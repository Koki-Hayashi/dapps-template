/* eslint-disable import/prefer-default-export */
// flow

export const randomStr = () =>
  Math.random()
    .toString(36)
    .substr(2);
