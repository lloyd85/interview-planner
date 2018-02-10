import { actionTypes } from '../constants';

const {
  FETCH_INTERVIEWS_ATTEMPT,
  FETCH_INTERVIEWS_SUCCESS,
  FETCH_INTERVIEWS_FAILURE,
  FETCH_INTERVIEW_ATTEMPT,
  FETCH_INTERVIEW_SUCCESS,
  FETCH_INTERVIEW_FAILURE,
  UPDATE_INTERVIEW_ATTEMPT,
  UPDATE_INTERVIEW_SUCCESS,
  UPDATE_INTERVIEW_FAILURE,
  ADD_INTERVIEW_ATTEMPT,
  ADD_INTERVIEW_SUCCESS,
  ADD_INTERVIEW_FAILURE,
  REMOVE_INTERVIEW_ATTEMPT,
  REMOVE_INTERVIEW_SUCCESS,
  REMOVE_INTERVIEW_FAILURE,
} = actionTypes;

export const fetchInterviews = () => ({
  type: FETCH_INTERVIEWS_ATTEMPT,
});

export const fetchInterviewsSuccess = payload => ({
  type: FETCH_INTERVIEWS_SUCCESS,
  payload,
});

export const fetchInterviewsFailure = error => ({
  type: FETCH_INTERVIEWS_FAILURE,
  payload: { error },
});

export const fetchInterview = id => ({
  type: FETCH_INTERVIEW_ATTEMPT,
  id,
});

export const fetchInterviewSuccess = payload => ({
  type: FETCH_INTERVIEW_SUCCESS,
  payload,
});

export const fetchInterviewFailure = error => ({
  type: FETCH_INTERVIEW_FAILURE,
  payload: { error },
});

export const updateInterview = (id, body) => ({
  type: UPDATE_INTERVIEW_ATTEMPT,
  id,
  body,
});

export const updateInterviewSuccess = payload => ({
  type: UPDATE_INTERVIEW_SUCCESS,
  payload,
});

export const updateInterviewFailure = error => ({
  type: UPDATE_INTERVIEW_FAILURE,
  payload: { error },
});

export const addInterview = body => ({
  type: ADD_INTERVIEW_ATTEMPT,
  body,
});

export const addInterviewSuccess = payload => ({
  type: ADD_INTERVIEW_SUCCESS,
  payload,
});

export const addInterviewFailure = error => ({
  type: ADD_INTERVIEW_FAILURE,
  payload: { error },
});

export const removeInterview = id => ({
  type: REMOVE_INTERVIEW_ATTEMPT,
  id,
});

export const removeInterviewSuccess = payload => ({
  type: REMOVE_INTERVIEW_SUCCESS,
  payload,
});

export const removeInterviewFailure = error => ({
  type: REMOVE_INTERVIEW_FAILURE,
  payload: { error },
});

export default {
  fetchInterviews,
  fetchInterview,
  updateInterview,
  removeInterview,
  addInterview,
};
