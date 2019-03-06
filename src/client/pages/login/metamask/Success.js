// @flow

import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import type { _styles } from './css';
import styles from './css';
import { redirect } from '../../../redirect/redirectService';
import { TOKENS } from '../../PAGE_ENUM';
import { updateStatus } from '../../../module/metamaskLoginModule';
import { NEUTRAL } from '../../../model/metaMaskLogin';

type _props = {
  classes: $PropertyType<_styles, 'success'>,
  updateStatus: Function,
};

@withStyles(styles.success)
class Success extends React.Component<_props> {
  componentDidMount() {
    setTimeout(() => {
      redirect(TOKENS);
      this.props.updateStatus(NEUTRAL);
    }, 2000); // wait 2 sec to show the user that login is succeeded
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CheckIcon className={classes.icon} />
        <Typography className={classes.text}>Success</Typography>
      </div>
    );
  }
}

export default connect(
  null,
  { updateStatus }
)(Success);
