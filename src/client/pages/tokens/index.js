// @flow

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { fetch } from '../../module/tokensModule';

import type { _styles } from './css';
import styles from './css';

import type { _tokens } from '../../model/tokens';
import Layout from '../../layout';
import TokenPanel from './tokenPanel';

type _props = {
  fetch: Function,
  classes: _styles,
  tokens: _tokens,
};

@withStyles(styles)
class TokensOverview extends React.Component<_props> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { classes, tokens } = this.props;
    const { fetching, data } = tokens;

    return (
      // $FlowFixMe
      <Layout>
        {!fetching && (
          <React.Fragment>
            <div className={classes.tokenPanel}>
              {data.map(token => (
                <TokenPanel key={token.symbol} token={token} />
              ))}
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
    tokens: state.tokensReducer,
  }),
  { fetch }
)(TokensOverview);
