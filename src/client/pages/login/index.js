// @flow

import * as React from 'react';
import type { _loginMethod } from './LOGIN_METHOD';
import { NOT_SELECTED, METAMASK } from './LOGIN_METHOD';
import Top from './top/index';
import MetaMask from './metamask';

type _props = {||};
type _state = {
  loginMethod: _loginMethod,
};

export default class Index extends React.Component<_props, _state> {
  state = {
    loginMethod: NOT_SELECTED,
  };

  onCancel = () => {
    this.setState({
      loginMethod: NOT_SELECTED,
    });
  };

  loginMethodSelect = (loginMethod: _loginMethod) => {
    this.setState({
      loginMethod,
    });
  };

  selectComp = (loginMethod: _loginMethod) => {
    switch (loginMethod) {
      case METAMASK:
        // $FlowFixMe
        return <MetaMask onCancel={this.onCancel} />;

      default:
        // $FlowFixMe
        return <Top onSelect={this.loginMethodSelect} />;
    }
  };

  render(): React.Node {
    const { loginMethod } = this.state;

    return this.selectComp(loginMethod);
  }
}
