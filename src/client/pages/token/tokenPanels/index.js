// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { SimpleList } from '../../../shared/panel';

import type { _styles } from './css';
import styles from './css';

import type { _token } from '../../../model/token';

type _props = {
  token: _token,
  classes: _styles,
};

const OPTIONS1 = [
  {
    keys: ['symbol'],
    label: 'Symbol',
  },
  {
    keys: ['name'],
    label: 'Name',
  },
];

const TokenPanels = ({ classes, token }: _props) => (
  // $FlowFixMe
  <section className={classes.root}>
    <SimpleList
      className={classNames(classes.list, 'first')}
      source={token.data}
      options={OPTIONS1}
    />
  </section>
);

export default withStyles(styles)(TokenPanels);
