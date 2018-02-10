import { Reducer } from 'redux-testkit';
import { merge } from 'seamless-immutable';
import InterviewsReducer, { initialState } from './';
import {
  fetchInterviews,
  fetchInterviewsSuccess,
  fetchInterviewsFailure,
  fetchInterview,
  fetchInterviewSuccess,
  fetchInterviewFailure,
  updateInterview,
  updateInterviewSuccess,
  updateInterviewFailure,
  removeInterview,
  removeInterviewSuccess,
  removeInterviewFailure,
} from '../actions';

describe('InterviewsReducer', () => {

  describe('Type: FETCH_INTERVIEWS_ATTEMPT', () => {

    it('should set isLoading to true', () => {
      const expectedState = merge(initialState, { isLoading: true });
      const action = fetchInterviews();

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEWS_SUCCESS', () => {
    const results = [{ role: 'Role', company: 'Company' }];
    const expectedState = merge(initialState, { isLoading: false, data: results });
    const action = fetchInterviewsSuccess(results);

    it('should add a interview collection to the state, and set property isLoading to false and set message to "Success"', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEWS_FAILURE', () => {
    const expectedState = merge(initialState, { isLoading: false, message: 'Interview\'s could not be loaded' });
    const action = fetchInterviewsFailure();

    it('should set prop isLoading to false, and populate prop message with error text', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEW_ATTEMPT', () => {
    it('should set isLoading to true', () => {
      const paramId = '789';
      const expectedState = merge(initialState, { isLoading: true, data: {} });
      const action = fetchInterview(paramId);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEW_SUCCESS', () => {
    const results = [{ id: '123', role: 'Developer', company: 'Google' }];
    const expectedState = merge(initialState, { isLoading: false, data: results });
    const action = fetchInterviewSuccess(results);

    it('should add a interview collection to the state, and set property isLoading to false and set message to "Success"', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { isLoading: false, message: 'Interview could not be loaded', data: {} });
    const action = fetchInterviewFailure();

    it('should set prop isLoading to false, and populate prop message with error text', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_INTERVIEW_ATTEMPT', () => {

    it('should set isLoading to true', () => {
      const paramId = '879';
      const body = { company: 'Instagram', role: 'Developer' };
      const expectedState = merge(initialState, { isLoading: true, data: {} });
      const action = updateInterview(paramId, body);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_INTERVIEW_SUCCESS', () => {
    const results = [{ id: '879', role: 'Developer', company: 'Instagram' }];
    const expectedState = merge(initialState, { isLoading: false, data: results });
    const action = updateInterviewSuccess(results);

    it('should add a interview collection to the state, and set property isLoading to false and set message to "Success"', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { isLoading: false, message: 'Interview could not be updated', data: {} });
    const action = updateInterviewFailure();

    it('should set prop isLoading to false, and populate prop message with error text', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_INTERVIEW_ATTEMPT', () => {
    it('should set isLoading to true', () => {
      const interviewId = '123';
      const expectedState = merge(initialState, { isLoading: true });
      const action = removeInterview(interviewId);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_INTERVIEW_SUCCESS', () => {
    const results = [
      { id: '456', role: 'Teamlead', company: 'Facebook' },
      { id: '789', role: 'Developer', company: 'Instagram' },
    ];

    const expectedState = merge(initialState, { isLoading: false, data: results });
    const action = removeInterviewSuccess(results);

    it('should add a interview collection to the state, and set property isLoading to false and set message to "Success"', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { isLoading: false, message: 'Interview could not be deleted' });
    const action = removeInterviewFailure();

    it('should set prop isLoading to false, and populate prop message with error text', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });
});
