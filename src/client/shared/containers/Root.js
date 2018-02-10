import React from 'react';
import { func, object } from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

const Root = ({ history, routes, store }) => (
  <Provider store={store}>
    <Router history={history}>
      {routes()}
    </Router>
  </Provider>
);

Root.propTypes = {
  routes: func.isRequired,
  store: object.isRequired,
  history: object.isRequired,
};

export default Root;
