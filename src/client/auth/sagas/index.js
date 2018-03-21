import { put, call, takeEvery } from 'redux-saga/effects';
import {
  loginUserSuccess,
  loginUserFailure,
  createPasswordTokenSuccess,
  createPasswordTokenFailure,
  getPasswordTokenSuccess,
  getPasswordTokenFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
} from '../actions';

import { actionTypes } from '../constants';
import service from '../services';

export default () => {
  function* loginUser({ body }) {
    try {
      const response = yield call(service.loginUser, body);
      const { data: { token } } = response;
      yield put(loginUserSuccess(token));
    } catch (error) {
      yield put(loginUserFailure(error));
    }
  }

  function* createPasswordToken({ body }) {
    try {
      const response = yield call(service.createPasswordToken, body);
      const { data: { message } } = response;
      yield put(createPasswordTokenSuccess(message));
    } catch (error) {
      yield put(createPasswordTokenFailure(error));
    }
  }

  function* getPasswordToken({ token }) {
    try {
      const response = yield call(service.getPasswordToken, token);
      const { data } = response;
      yield put(getPasswordTokenSuccess(data.token));
    } catch (error) {
      yield put(getPasswordTokenFailure(error));
    }
  }

  function* updatePassword({ token, body }) {
    try {
      const response = yield call(service.updatePassword, token, body);
      const { data } = response;
      yield put(updatePasswordSuccess(data.token));
    } catch (error) {
      yield put(updatePasswordFailure(error));
    }
  }

  function* startWatchers() {
    yield takeEvery(actionTypes.LOGIN_USER_ATTEMPT, loginUser);
    yield takeEvery(actionTypes.CREATE_PASSWORD_TOKEN_ATTEMPT, createPasswordToken);
    yield takeEvery(actionTypes.GET_PASSWORD_TOKEN_ATTEMPT, getPasswordToken);
    yield takeEvery(actionTypes.UPDATE_PASSWORD_ATTEMPT, updatePassword);
  }

  return {
    loginUser,
    createPasswordToken,
    getPasswordToken,
    updatePassword,
    startWatchers,
  };
};

