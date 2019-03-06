// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { fetch } from '../../module/tokenModule';

import type { _styles } from './css';
import styles from './css';

import type { _token } from '../../model/token';
import Layout from '../../layout';
import TokenPanels from './tokenPanels';

type _props = {
  fetch: Function,
  classes: _styles,
  token: _token,
  computedMatch: any,
};

@withStyles(styles)
class TokenDetail extends React.Component<_props> {
  componentDidMount() {
    // $FlowFixMe
    this.props.fetch(this.props.computedMatch.params.id);
  }

  render() {
    const { classes, token } = this.props;
    const { fetching } = token;
    return (
      // $FlowFixMe
      <Layout>
        {!fetching && (
          <React.Fragment>
            <div className={classes.tokenPanels}>
              <TokenPanels token={token} />
            </div>
          </React.Fragment>
        )}
      </Layout>
    );
  }
}

// $FlowFixMe
export default connect(
  state => ({
    token: state.tokenReducer,
  }),
  { fetch }
)(TokenDetail);
