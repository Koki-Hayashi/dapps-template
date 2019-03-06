// @flow

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import type { _styles } from './css';
import styles from './css';
import Profile from './Profile';

type _props = {
  classes: _styles,
  text: string,
};

@withStyles(styles)
export default class Header extends React.Component<_props> {
  render() {
    const { classes, text } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.title}>{text}</div>
        <Profile accountName="user1" organizationName="xyz company" />
      </div>
    );
  }
}
