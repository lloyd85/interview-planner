import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

import {
  fetchInterviews as getInterviews,
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
      yield call(delay, 5000);
      const response = yield call(service.fetchInterviews);
      const { data: { results } } = response;

      yield put(fetchInterviewsSuccess(results));
    } catch (error) {
      yield put(fetchInterviewsFailure(error));
    }
  }

  function* fetchInterview({ id }) {
    try {
      const response =
        yield call(service.fetchInterview, id);
      const { data: { results } } = response;

      yield put(fetchInterviewSuccess(results));
    } catch (error) {
      yield put(fetchInterviewFailure(error));
    }
  }
  function* updateInterview({ id, body }) {
    try {
      const response = yield call(service.updateInterview, id, body);
      const { data: { results } } = response;

      yield put(updateInterviewSuccess(results));
    } catch (error) {
      yield put(updateInterviewFailure(error));
    }
  }

  function* addInterview({ body }) {
    try {
      const response = yield call(service.addInterview, body);
      const { data: { message } } = response;

      yield put(addInterviewSuccess(message));
      yield put(getInterviews());
    } catch (error) {
      yield put(addInterviewFailure(error));
    }
  }

  function* removeInterview({ id }) {
    try {
      const response = yield call(service.removeInterview, id);
      const { data: { message } } = response;

      yield put(removeInterviewSuccess(message));
      yield put(getInterviews());
    } catch (error) {
      yield put(removeInterviewFailure(error));
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
