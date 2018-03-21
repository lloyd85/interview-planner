import { put, call, takeEvery } from 'redux-saga/effects';

import {
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserSuccess,
  updateUserFailure,
  addUserSuccess,
  addUserFailure,
  removeUserSuccess,
  removeUserFailure,
} from '../actions';

import { actionTypes } from '../constants';
import service from '../services';

export default () => {
  function* fetchUsers() {
    try {
      const response = yield call(service.fetchUsers);
      const { data: { results } } = response;

      yield put(fetchUsersSuccess(results));
    } catch (error) {
      yield put(fetchUsersFailure(error));
    }
  }

  function* fetchUser({ id }) {
    try {
      const response = yield call(service.fetchUser, id);
      const { data: { results } } = response;

      yield put(fetchUserSuccess(results));
    } catch (error) {
      yield put(fetchUserFailure(error));
    }
  }
  function* updateUser({ id, body }) {
    try {
      const response = yield call(service.updateUser, id, body);
      const { data: { results } } = response;

      yield put(updateUserSuccess(results));
    } catch (error) {
      yield put(updateUserFailure(error));
    }
  }

  function* addUser({ body }) {
    try {
      const response = yield call(service.addUser, body);
      const { data: { message } } = response;

      yield put(addUserSuccess(message));
    } catch (error) {
      yield put(addUserFailure(error));
    }
  }

  function* removeUser({ id }) {
    try {
      const response = yield call(service.removeUser, id);
      const { data: { message } } = response;

      yield put(removeUserSuccess(message));
    } catch (error) {
      yield put(removeUserFailure(error));
    }
  }

  function* startWatchers() {
    yield takeEvery(actionTypes.FETCH_USERS_ATTEMPT, fetchUsers);
    yield takeEvery(actionTypes.FETCH_USER_ATTEMPT, fetchUser);
    yield takeEvery(actionTypes.UPDATE_USER_ATTEMPT, updateUser);
    yield takeEvery(actionTypes.ADD_USER_ATTEMPT, addUser);
    yield takeEvery(actionTypes.REMOVE_USER_ATTEMPT, removeUser);
  }

  return {
    fetchUsers,
    fetchUser,
    updateUser,
    addUser,
    removeUser,
    startWatchers,
  };
};
