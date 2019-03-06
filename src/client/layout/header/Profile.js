// @flow

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import CircleIcon from '@material-ui/icons/Lens';

import type { _styles } from './css';
import styles from './css';
import logoutService from '../../logout/logoutService';

type _props = {
  classes: $PropertyType<_styles, 'profile'>,
  organizationName: string,
  accountName: string,
};

type _state = {
  hover: boolean,
};

class Profile extends React.Component<_props, _state> {
  state = {
    hover: false,
  };

  render() {
    const { classes, organizationName, accountName } = this.props;
    const { hover } = this.state;

    return (
      <div
        className={classNames(classes.root, { hover })}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className={classes.names}>
          <p className={classes.organizationName}>{organizationName}</p>
          <p className={classes.accountName}>
            <CircleIcon className={classes.statusIcon} />
            {accountName}
          </p>
        </div>

        <Collapse in={hover} timeout={{ enter: 250, exit: 0 }}>
          <div className={classes.actions}>
            <button className={classes.action} onClick={() => logoutService()}>
              <PowerIcon className={classes.actionIcon} />
              Logout
            </button>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles.profile)(Profile);
