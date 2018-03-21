import React from 'react';
import { func, object } from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';

const Root = ({
  history,
  routes,
  store,
  persistor,
}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        {routes()}
      </Router>
    </PersistGate>
  </Provider>
);

Root.propTypes = {
  routes: func.isRequired,
  store: object.isRequired,
  persistor: object.isRequired,
  history: object.isRequired,
};

export default Root;
