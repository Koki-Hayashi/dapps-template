// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { etherscan } from 'config';
import BaseButton from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';

import type { _styles } from './css';
import styles from './css';

export type buttonType = 'primary' | 'attention' | 'white' | 'text';

type _props = {
  className: string,
  classes: _styles,
  type: buttonType,
  onClick: Function,
  children: React.Node,
};

const Button = ({
  className = '',
  classes,
  type = 'primary',
  children,
  ...other
}: _props) => (
  <BaseButton
    {...other}
    valiant={type === 'primary' ? 'flat' : 'outlined'}
    // $FlowFixMe
    classes={{
      root: classNames(className, classes.root, type),
      disabled: classNames(classes.disabled),
    }}
  >
    {children}
  </BaseButton>
);

type _etherscanButtonProps = {
  className: string,
  classes: _styles,
  address: string,
  type: buttonType,
  label: React.Node,
};

const EtherscanButtonComponent = ({
  className = '',
  classes,
  address,
  type = 'white',
  label,
}: _etherscanButtonProps) => (
  <Button
    className={classNames(className, classes.etherscan)}
    classes={classes}
    type={type}
    onClick={() => window.open(`${etherscan.host}/address/${address}`)}
  >
    <LaunchIcon className={classes.etherscanIcon} />
    {label || 'Etherscan'}
  </Button>
);
export const EtherscanButton = withStyles(styles)(EtherscanButtonComponent);

export default withStyles(styles)(Button);
