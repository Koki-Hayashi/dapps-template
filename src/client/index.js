import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Route, Router, Switch } from 'react-router-dom';
import { LOGIN, TOKENS, NOT_FOUND, TOKEN_DETAIL } from './pages/PAGE_ENUM';
import LoginRequiredRoute from './pages/LoginRequiredRoute';
import history from './history';
import store from './store';
import StoreRegistry from './store/StoreRegistry';

StoreRegistry.setStore(store);

const content = document.getElementById('content');
if (!content) {
  throw new Error("Element with id 'content' should exist");
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact {...LOGIN} />
        <LoginRequiredRoute exact {...TOKENS} />
        <LoginRequiredRoute exact {...TOKEN_DETAIL} />
        <Route {...NOT_FOUND} />
      </Switch>
    </Router>
  </Provider>,
  content
);
