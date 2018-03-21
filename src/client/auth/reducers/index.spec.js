import { Reducer } from 'redux-testkit';
import { merge } from 'seamless-immutable';
import AuthReducer, { initialState } from './';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
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

describe('AuthReducer', () => {

  describe('Type: LOGIN_USER_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const loginCredentials = {
        username: 'john.doe',
        password: 'password1',
      };
      const expectedState = merge(initialState, { isLoading: true });
      const action = loginUser(loginCredentials);

      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: LOGIN_USER_SUCCESS', () => {
    const result = { token: 'abc' };
    const expectedState = merge(initialState, { token: 'abc' });
    const action = loginUserSuccess(result.token);

    it('should load a token and update the state and set property isLoading to false', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: LOGIN_USER_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'User could not be authenticated' });
    const action = loginUserFailure();

    it('should set isLoading prop to false, and throw error', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: LOGOUT_USER', () => {
    const expectedState = initialState;
    const action = logoutUser();

    it('should set user prop with retrieved data from local storage', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_PASSWORD_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const token = 'abc';
      const passwordCredentials = {
        password: 'password',
      };
      const expectedState = merge(initialState, { isLoading: true });
      const action = updatePassword(token, passwordCredentials);

      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_PASSWORD_SUCCESS', () => {
    const result = { token: 'abc' };
    const expectedState = merge(initialState, { token: 'abc', message: 'Password successfully updated' });
    const action = updatePasswordSuccess(result.token);

    it('should load a token and update the state and set property isLoading to false', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_PASSWORD_SUCCESS', () => {
    const expectedState = merge(initialState, { message: 'Password could not be updated' });
    const action = updatePasswordFailure();

    it('should set isLoading prop to false, and throw error', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: GET_PASSWORD_TOKEN_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const token = 'abc';
      const expectedState = merge(initialState, { isLoading: true });
      const action = getPasswordToken(token);

      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: GET_PASSWORD_TOKEN_SUCCESS', () => {
    const result = { token: 'cdf' };
    const expectedState = merge(initialState, { passwordToken: 'cdf' });
    const action = getPasswordTokenSuccess(result.token);

    it('should load a success token and update the state and set property isLoading to false', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: GET_PASSWORD_TOKEN_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Password token could not be retrieved' });
    const action = getPasswordTokenFailure();

    it('should set isLoading prop to false, and throw error', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: CREATE_PASSWORD_TOKEN_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const emailCredentials = {
        password: 'john.doe.@me.com',
      };
      const expectedState = merge(initialState, { isLoading: true });
      const action = createPasswordToken(emailCredentials);

      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: CREATE_PASSWORD_TOKEN_SUCCESS', () => {
    const result = { message: 'An email has been sent to user with further instructions.' };
    const expectedState = merge(initialState, { message: 'An email has been sent to user with further instructions.' });
    const action = createPasswordTokenSuccess(result.message);

    it('should load a successs message and update the state and set property isLoading to false', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: CREATE_PASSWORD_TOKEN_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Password token could not be created' });
    const action = createPasswordTokenFailure();

    it('should set isLoading prop to false, and throw error', () => {
      Reducer(AuthReducer).expect(action).toReturnState(expectedState);
    });
  });
});
