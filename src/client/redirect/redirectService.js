// @flow
import type { _pageEnum } from '../pages/PAGE_ENUM';

import history from '../history';

export const redirect = (pageEnum: _pageEnum, extraPath: string = '') => {
  history.push(pageEnum.path + extraPath);
};

export const redirectWithReplaces = (
  pageEnum: _pageEnum,
  replaces: Array<{
    target: string,
    value: string,
  }>
) => {
  const targetPath = replaces.reduce(
    (path, replace) => path.replace(replace.target, replace.value),
    pageEnum.path
  );
  history.push(targetPath);
};
