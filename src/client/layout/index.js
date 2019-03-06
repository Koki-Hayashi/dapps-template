// @flow

import * as React from 'react';
import { withRouter } from 'react-router';
import type { Location } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import _find from 'lodash/find';

import SideBar from './SideBar';
import Header from './header/';
import type { _styles } from './css';
import styles from './css';
import * as PAGES from '../pages/PAGE_ENUM';

type _props = {
  classes: _styles,
  children: React.Node,
  location: Location,
};

@withStyles(styles)
// $FlowFixMe
class Layout extends React.Component<_props> {
  render() {
    const { classes, children, location } = this.props;

    const pageItem = _find(
      PAGES,
      page =>
        page.reg
          ? page.reg.test(location.pathname)
          : page.path === location.pathname
    );

    return (
      <div className={classes.root}>
        <SideBar />
        {/* $FlowFixMe */}
        <Header text={pageItem.title} />
        <div className={classes.contentWrapper}>
          <div className={classes.content}>{children}</div>
        </div>
        {/* TODO show loading spinner while children component isn't ready */}
      </div>
    );
  }
}

// $FlowFixMe
export default withRouter(Layout);
