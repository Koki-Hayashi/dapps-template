// @flow

import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { loginWithMetaMask } from '../../../useCase/metamask/loginUseCase';
import type { _styles } from './css';
import styles from './css';
import Button from '../../../shared/button';
import NoMetaMask from './NoMetaMask';
import Success from './Success';

import type { _status } from '../../../model/metaMaskLogin';
import MetaMaskLoginModel, {
  NO_LOGIN,
  NO_META_MASK,
  SUCCESS,
  VERIFYING,
  WAITING_SIGN,
} from '../../../model/metaMaskLogin';
import LoginTransitionCommon from './LoginTransitionCommon';

type _props = {
  classes: _styles,
  onCancel: Function,
  metaMaskLogin: MetaMaskLoginModel,
  loginWithMetaMask: Function,
};

@withStyles(styles)
class MetaMask extends React.Component<_props> {
  componentWillMount(): void {
    this.props.loginWithMetaMask();
  }

  selectContent = (status: _status) => {
    switch (status) {
      case NO_META_MASK: {
        return <NoMetaMask />;
      }

      case NO_LOGIN: {
        return (
          <LoginTransitionCommon
            statusText="Your MetaMask seems locked."
            text="Please open MetaMask and follow the instruction to unlock it."
            attention
          />
        );
      }

      case WAITING_SIGN: {
        return (
          <LoginTransitionCommon
            statusText="Waiting for your sign..."
            text="Please sign it on your MetaMask for authentication."
          />
        );
      }

      case VERIFYING: {
        return (
          <LoginTransitionCommon statusText="Verifying your signature..." />
        );
      }

      case SUCCESS: {
        // $FlowFixMe
        return <Success />;
      }

      default: {
        return <LoginTransitionCommon text="Login failed..." />;
      }
    }
  };

  render(): React.Node {
    const { classes, onCancel, metaMaskLogin } = this.props;
    const { status, isBackDisabled } = metaMaskLogin;

    const hideBackBtn = status === VERIFYING || status === SUCCESS;

    return (
      <div className={classes.root}>
        <div className={classes.textWrapper}>
          <Typography className={classes.text}>Connect to MetaMask</Typography>
        </div>
        <div className={classes.contentWrapper}>
          {this.selectContent(status)}
        </div>
        {!hideBackBtn && (
          <Button
            className={classes.button}
            type="white"
            onClick={onCancel}
            disabled={isBackDisabled}
          >
            Back
          </Button>
        )}
      </div>
    );
  }
}

// $FlowFixMe
export default connect(
  state => ({
    metaMaskLogin: state.metaMaskLoginReducer,
  }),
  { loginWithMetaMask }
)(MetaMask);
