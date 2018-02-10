import React from 'react';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import InterviewsReducer from './interviews/reducers';
import InterviewsSagas from './interviews/sagas';
import InterviewsRoutes from './interviews/routes';

export const rootReducers = combineReducers({
  interviews: InterviewsReducer,
});

export function* rootSaga() {
  yield all([
    InterviewsSagas().startWatchers(),
  ]);
}

export const rootRoutes = () => (
  <InterviewsRoutes />
);
