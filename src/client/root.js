import React from 'react';
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import AuthReducer from './auth/reducers';
import AuthSagas from './auth/sagas';
import AuthRoutes from './auth/routes';

import UsersReducer from './users/reducers';
import UsersSagas from './users/sagas';
import UsersRoutes from './users/routes';

import InterviewsReducer from './interviews/reducers';
import InterviewsSagas from './interviews/sagas';
import InterviewsRoutes from './interviews/routes';

export const rootReducers = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  interviews: InterviewsReducer,
});

export function* rootSaga() {
  yield all([
    AuthSagas().startWatchers(),
    UsersSagas().startWatchers(),
    InterviewsSagas().startWatchers(),
  ]);
}

export const rootRoutes = () => (
  <div>
    <AuthRoutes />
    <UsersRoutes />
    <InterviewsRoutes />
  </div>
);
