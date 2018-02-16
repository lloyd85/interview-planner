import { Reducer } from 'redux-testkit';
import { merge } from 'seamless-immutable';
import InterviewsReducer, { initialState } from './';
import {
  fetchInterviews as getInterviews,
  fetchInterviewsSuccess,
  fetchInterviewsFailure,
  fetchInterview,
  fetchInterviewSuccess,
  fetchInterviewFailure,
  addInterview,
  addInterviewSuccess,
  addInterviewFailure,
  updateInterview,
  updateInterviewSuccess,
  updateInterviewFailure,
  removeInterview,
  removeInterviewSuccess,
  removeInterviewFailure,
} from '../actions';

describe('InterviewsReducer', () => {

  describe('Type: FETCH_INTERVIEWS_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const expectedState = merge(initialState, { isLoading: true });
      const action = getInterviews();

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEWS_SUCCESS', () => {
    const results = [{ role: 'Role', company: 'Company' }];
    const expectedState = merge(initialState, { data: results });
    const action = fetchInterviewsSuccess(results);

    it('should load an interview collection to the state and set property isLoading to false', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEWS_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Interviews could not be loaded' });
    const action = fetchInterviewsFailure();

    it('should set isLoading prop to false, and throw error', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEW_ATTEMPT', () => {
    it('should set isLoading prop to true', () => {
      const paramId = '789';
      const expectedState = merge(initialState, { isLoading: true });
      const action = fetchInterview(paramId);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEW_SUCCESS', () => {
    const results = [{ _id: '123', role: 'Developer', company: 'Google' }];
    const expectedState = merge(initialState, { data: results });
    const action = fetchInterviewSuccess(results);

    it('should load a single interview to state and set property isLoading to false', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Interview could not be loaded' });
    const action = fetchInterviewFailure();

    it('should set isLoading prop to false and throw error', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: ADD_INTERVIEW_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const body = { role: 'Tester', company: 'LinkedIn' };
      const expectedState = merge(initialState, { isLoading: true });
      const action = addInterview(body);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: ADD_INTERVIEW_SUCCESS', () => {
    const message = 'Interview has been added';
    const expectedState = merge(initialState, { message: 'Interview has been added' });
    const action = addInterviewSuccess(message);

    it('should add an interview to collection, set isLoading prop to false and send success message', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: ADD_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { isLoading: false, message: 'Interview could not be added' });
    const action = addInterviewFailure();

    it('should set isLoading prop to false and throw error', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_INTERVIEW_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const paramId = '879';
      const body = { company: 'Instagram', role: 'Developer' };
      const expectedState = merge(initialState, { isLoading: true });
      const action = updateInterview(paramId, body);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_INTERVIEW_SUCCESS', () => {
    const results = [{ _id: '879', role: 'Developer', company: 'Instagram' }];
    const expectedState = merge(initialState, { data: results });
    const action = updateInterviewSuccess(results);

    it('should update interview, set isLoading prop to false and send success message', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Interview could not be updated' });
    const action = updateInterviewFailure();

    it('should set isLoading prop to false and throw error', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_INTERVIEW_ATTEMPT', () => {
    it('should set isLoading prop to true', () => {
      const interviewId = '123';
      const expectedState = merge(initialState, { isLoading: true });
      const action = removeInterview(interviewId);

      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_INTERVIEW_SUCCESS', () => {
    const message = 'Interview has been removed';
    const expectedState = merge(initialState, { message: 'Interview has been removed' });
    const action = removeInterviewSuccess(message);

    it('should remove the interview, isLoading prop to false and set message send success message', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_INTERVIEW_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Interview could not be removed' });
    const action = removeInterviewFailure();

    it('should set prop isLoading to false and populate throw error', () => {
      Reducer(InterviewsReducer).expect(action).toReturnState(expectedState);
    });
  });
});
