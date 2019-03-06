// @flow

import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../../shared/button';

import type { _styles } from './css';
import styles from './css';
import { METAMASK } from '../LOGIN_METHOD';

type _props = {
  classes: _styles,
  onSelect: Function,
};

const top = ({ classes, onSelect }: _props) => (
  <div className={classes.root}>
    <div className={classes.upper}>
      <Typography className={classes.name}>P mint</Typography>
      <Typography className={classes.welcome}>Welcome back</Typography>
      <Typography className={classes.subtitle}>
        Smart Manager for Security Token Offerings.
      </Typography>
    </div>
    <div className={classes.lower}>
      <Typography className={classes.loginText}>Log in</Typography>
      <Typography className={classes.subtext}>
        select your key manager.
      </Typography>
      <Button
        className={classes.metaMaskBtn}
        type="attention"
        onClick={() => onSelect(METAMASK)}
      >
        MetaMask
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(top);
