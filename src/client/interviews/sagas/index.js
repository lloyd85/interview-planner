import { put, call, takeEvery } from 'redux-saga/effects';

import { API } from '../../shared/helpers';
import {
  fetchInterviewsSuccess,
  fetchInterviewsFailure,
  fetchInterviewSuccess,
  fetchInterviewFailure,
  updateInterviewSuccess,
  updateInterviewFailure,
  addInterviewSuccess,
  addInterviewFailure,
  removeInterviewSuccess,
  removeInterviewFailure,
} from '../actions';

import { actionTypes } from '../constants';
import service from '../services';

export default () => {
  function* fetchInterviews() {
    try {
      const response = yield call(service.fetchInterviews);
      const { data: { results } } = response;

      yield put(fetchInterviewsSuccess(results));
    } catch (e) {
      yield put(fetchInterviewsFailure(e));
    }
  }

  function* fetchInterview({ id }) {
    try {
      const response =
        yield call(service.fetchInterview, id);
      const { data: { results } } = response;

      yield put(fetchInterviewSuccess(results));
    } catch (e) {
      yield put(fetchInterviewFailure(e));
    }
  }
  function* updateInterview({ id, body }) {
    try {
      const response = yield call(service.updateInterview, id, body);
      const { data: { results } } = response;

      yield put(updateInterviewSuccess(results));
    } catch (e) {
      yield put(updateInterviewFailure(e));
    }
  }

  function* addInterview({ body }) {
    try {
      const response = yield call(service.addInterview, body);
      const { data: { results } } = response;

      yield put(addInterviewSuccess(results));
    } catch (e) {
      yield put(addInterviewFailure(e));
    }
  }

  function* removeInterview({ id }) {
    try {
      const response = yield call(service.removeInterview, id);
      const { data: { results } } = response;

      yield put(removeInterviewSuccess(results));
    } catch (e) {
      yield put(removeInterviewFailure(e));
    }
  }

  function* startWatchers() {
    yield takeEvery(actionTypes.FETCH_INTERVIEWS_ATTEMPT, fetchInterviews);
    yield takeEvery(actionTypes.FETCH_INTERVIEW_ATTEMPT, fetchInterview);
    yield takeEvery(actionTypes.UPDATE_INTERVIEW_ATTEMPT, updateInterview);
    yield takeEvery(actionTypes.ADD_INTERVIEW_ATTEMPT, addInterview);
    yield takeEvery(actionTypes.REMOVE_INTERVIEW_ATTEMPT, removeInterview);
  }

  return {
    fetchInterviews,
    fetchInterview,
    updateInterview,
    addInterview,
    removeInterview,
    startWatchers,
  };
};
