// @flow

import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

import type { _styles } from './css';
import styles from './css';

import { redirectWithReplaces } from '../../../redirect/redirectService';
import { TOKEN_DETAIL } from '../../PAGE_ENUM';
import type { _token } from '../../../../server/routes/api/v1/tokens/types';

type _props = {
  classes: _styles,
  token: _token,
};

const redirectToTokenDetail = id => {
  redirectWithReplaces(TOKEN_DETAIL, [{ target: ':id', value: String(id) }]);
};

const TokenPanel = ({ token, classes }: _props) => (
  <Paper
    className={classes.root}
    onClick={() => redirectToTokenDetail(token.id)}
  >
    <Typography className={classes.symbolText}>{token.symbol}</Typography>
    <Typography className={classes.nameText}>{token.name}</Typography>
  </Paper>
);

export default withStyles(styles)(TokenPanel);
