import { put, call } from 'redux-saga/effects';
import AuthSagas from './';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  createPasswordToken,
  createPasswordTokenSuccess,
  createPasswordTokenFailure,
  getPasswordToken,
  getPasswordTokenSuccess,
  getPasswordTokenFailure,
  updatePassword,
  updatePasswordSuccess,
  updatePasswordFailure,
} from '../actions';

import service from '../services';

describe('Sagas: Auth', () => {
  describe('loginUser()', () => {
    const loginCredentials = {
      username: 'john.doe',
      password: 'password1',
    };
    const action = loginUser(loginCredentials);
    const gen = AuthSagas().loginUser(action);

    it('should make a call to API method loginUser()', () => {
      const expected = call(service.loginUser, loginCredentials);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { token: 'abc' } };
      const token = successResponse.data.token;
      const expected = put(loginUserSuccess(token));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(loginUserFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('createPasswordToken()', () => {
    const emailCredentials = {
      email: 'john.doe.@me.com',
    };
    const action = createPasswordToken(emailCredentials);
    const gen = AuthSagas().createPasswordToken(action);

    it('should make a call to API method createPasswordToken()', () => {
      const expected = call(service.createPasswordToken, emailCredentials);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { message: 'An email has been sent to user with further instructions.' } };
      const message = successResponse.data.message;
      const expected = put(createPasswordTokenSuccess(message));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(createPasswordTokenFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('getPasswordToken()', () => {
    const token = 'abc';
    const action = getPasswordToken(token);
    const gen = AuthSagas().getPasswordToken(action);

    it('should make a call to API method getPasswordToken()', () => {
      const expected = call(service.getPasswordToken, token);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { token: 'efg' } };
      const token = successResponse.data.token;
      const expected = put(getPasswordTokenSuccess(token));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(getPasswordTokenFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('updatePassword()', () => {
    const token = 'abc';
    const body = { password: 'password' };
    const action = updatePassword(token, body);
    const gen = AuthSagas().updatePassword(action);

    it('should make a call to API method updatePassword()', () => {
      const expected = call(service.updatePassword, token, body);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { token: 'abc' } };
      const token = successResponse.data.token;
      const expected = put(updatePasswordSuccess(token));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(updatePasswordFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });
});
