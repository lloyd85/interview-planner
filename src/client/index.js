import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createBrowserHistory from 'history/createBrowserHistory';

import { rootReducers as reducers, rootSaga, rootRoutes as routes } from './root';

import { Root } from './shared/containers';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window !== 'undefined' &&
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

render(
  <Root
    routes={routes}
    store={store}
    history={history}
    persistor={persistor}
  />,
  document.getElementById('root'),
);
