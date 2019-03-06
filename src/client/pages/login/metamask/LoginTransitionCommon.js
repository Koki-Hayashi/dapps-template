// @flow

import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import type { _styles } from './css';
import styles from './css';

type _props = {
  statusText: string,
  attention: boolean,
  text: string,
  classes: $PropertyType<_styles, 'transition'>,
};

const LoginTransitionCommon = ({
  statusText,
  attention,
  text,
  classes,
}: _props) => (
  <React.Fragment>
    {!!statusText && (
      <div
        className={
          attention ? classes.attentionStatusWrapper : classes.statusWrapper
        }
      >
        <Typography
          className={
            attention ? classes.attentionStatusText : classes.statusText
          }
        >
          {statusText}
        </Typography>
      </div>
    )}
    {!!text && <Typography className={classes.text}>{text}</Typography>}
  </React.Fragment>
);

export default withStyles(styles.transition)(LoginTransitionCommon);
