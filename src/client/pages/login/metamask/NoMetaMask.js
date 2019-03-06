// @flow

import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import type { _styles } from './css';
import styles from './css';

type _props = {
  classes: $PropertyType<_styles, 'noMetaMask'>,
};

const noMetaMask = ({ classes }: _props) => (
  <div className={classes.root}>
    <Typography className={classes.text}>
      Please install the MetaMask Chrome extention.
    </Typography>
    <img alt="metamask" src="/img/login/metamask.png" />
  </div>
);

export default withStyles(styles.noMetaMask)(noMetaMask);
