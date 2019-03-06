// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedIn from '../auth/authService';

import { LOGIN } from './PAGE_ENUM';

export default class LoginRequiredRoute extends Route {
  render(): React.Node {
    if (!isLoggedIn()) {
      return <Redirect to={LOGIN.path} />;
    }

    /* $FlowFixMe */
    const Component = this.props.component;

    /* $FlowFixMe */
    return <Component {...this.props} />;
  }
}
