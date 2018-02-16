import { put, call } from 'redux-saga/effects';
import InterviewsSagas from './';
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
  addInterview,
  addInterviewSuccess,
  addInterviewFailure,
  removeInterview,
  removeInterviewSuccess,
  removeInterviewFailure,
} from '../actions';

import service from '../services';

describe('Sagas: Interviews', () => {
  describe('fetchInterviews()', () => {
    const gen = InterviewsSagas().fetchInterviews();

    it('should make a call to API method fetchInterviews()', () => {
      const expected = call(service.fetchInterviews);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { results: [
            { _id: '123', role: 'Developer', company: 'Google' },
            { _id: '456', role: 'Teamlead', company: 'Facebook' },
            { _id: '789', role: 'Manager', company: 'Twitter' },
          ] } };
      const results = successResponse.data.results;
      const expected = put(fetchInterviewsSuccess(results));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(fetchInterviewsFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('fetchInterview()', () => {
    const id = '123';
    const action = fetchInterview(id);
    const gen = InterviewsSagas().fetchInterview(action);

    it('should make a call to API method fetchInterview()', () => {
      const expected = call(service.fetchInterview, id);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { results: { _id: '123', role: 'Developer', company: 'Google' } } };
      const results = successResponse.data.results;
      const expected = put(fetchInterviewSuccess(results));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(fetchInterviewFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('updateInterview()', () => {
    const id = '789';
    const body = { company: 'Instagram', role: 'Manager' };
    const action = updateInterview(id, body);
    const gen = InterviewsSagas().updateInterview(action);

    it('should make a call to API method updateInterview()', () => {
      const expected = call(service.updateInterview, id, body);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = {
        data: {
          results: { _id: '789', role: 'Developer', company: 'Instagram' },
        },
      };
      const results = successResponse.data.results;
      const expected = put(updateInterviewSuccess(results));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(updateInterviewFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('addInterview()', () => {
    const body = { _id: '101', role: 'Tester', company: 'LinkedIn' };
    const action = addInterview(body);
    const gen = InterviewsSagas().addInterview(action);

    it('should make a call to API method addInterview()', () => {
      const expected = call(service.addInterview, body);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { message: 'Interview has been added' } };
      const expected = put(addInterviewSuccess('Interview has been added'));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(addInterviewFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('removeInterview()', () => {
    const id = '123';
    const action = removeInterview(id);
    const gen = InterviewsSagas().removeInterview(action);

    it('should make a call to API method removeInterview()', () => {
      const expected = call(service.removeInterview, id);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { message: 'Interview has been removed' } };
      const expected = put(removeInterviewSuccess('Interview has been removed'));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(removeInterviewFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });
});
