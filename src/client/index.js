import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import { rootReducers as reducers, rootSaga, rootRoutes as routes } from './root';

import { Root } from './shared/containers';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' &&
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

sagaMiddleware.run(rootSaga);

render(
  <Root routes={routes} store={store} history={history} />,
  document.getElementById('root'),
);
