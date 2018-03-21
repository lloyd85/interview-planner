import { Reducer } from 'redux-testkit';
import { merge } from 'seamless-immutable';
import UsersReducer, { initialState } from './';
import {
  fetchUsers as getUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  removeUser,
  removeUserSuccess,
  removeUserFailure,
} from '../actions';

describe('UsersReducer', () => {

  describe('Type: FETCH_USERS_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const expectedState = merge(initialState, { isLoading: true });
      const action = getUsers();

      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_USERS_SUCCESS', () => {
    const results = [{ role: 'Role', company: 'Company' }];
    const expectedState = merge(initialState, { data: results });
    const action = fetchUsersSuccess(results);

    it('should load an user collection to the state and set property isLoading to false', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_USERS_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'Users could not be loaded' });
    const action = fetchUsersFailure();

    it('should set isLoading prop to false, and throw error', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_USER_ATTEMPT', () => {
    it('should set isLoading prop to true', () => {
      const paramId = '789';
      const expectedState = merge(initialState, { isLoading: true });
      const action = fetchUser(paramId);

      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_USER_SUCCESS', () => {
    const results = [{ _id: '123', role: 'Developer', company: 'Google' }];
    const expectedState = merge(initialState, { data: results });
    const action = fetchUserSuccess(results);

    it('should load a single user to state and set property isLoading to false', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: FETCH_USER_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'User could not be loaded' });
    const action = fetchUserFailure();

    it('should set isLoading prop to false and throw error', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: ADD_USER_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const body = { role: 'Tester', company: 'LinkedIn' };
      const expectedState = merge(initialState, { isLoading: true });
      const action = addUser(body);

      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: ADD_USER_SUCCESS', () => {
    const message = 'User has been added';
    const expectedState = merge(initialState, { status: 'User has been added' });
    const action = addUserSuccess(message);

    it('should add an user to collection, set isLoading prop to false and send success message', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: ADD_USER_FAILURE', () => {
    const expectedState = merge(initialState, { isLoading: false, message: 'User could not be added' });
    const action = addUserFailure();

    it('should set isLoading prop to false and throw error', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_USER_ATTEMPT', () => {

    it('should set isLoading prop to true', () => {
      const paramId = '879';
      const body = { company: 'Instagram', role: 'Developer' };
      const expectedState = merge(initialState, { isLoading: true });
      const action = updateUser(paramId, body);

      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_USER_SUCCESS', () => {
    const results = { _id: '879', role: 'Developer', company: 'Instagram' };
    const expectedState = merge(initialState, { data: results });
    const action = updateUserSuccess(results);

    it('should update user, set isLoading prop to false and send success message', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: UPDATE_USER_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'User could not be updated' });
    const action = updateUserFailure();

    it('should set isLoading prop to false and throw error', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_USER_ATTEMPT', () => {
    it('should set isLoading prop to true', () => {
      const userId = '0';
      const expectedState = merge(initialState, { isLoading: true });
      const action = removeUser(userId);

      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_USER_SUCCESS', () => {
    const message = 'User has been removed';
    const expectedState = merge(initialState, { message: 'User has been removed' });
    const action = removeUserSuccess(message);

    it('should remove the user, isLoading prop to false and set message send success message', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });

  describe('Type: REMOVE_USER_FAILURE', () => {
    const expectedState = merge(initialState, { message: 'User could not be removed' });
    const action = removeUserFailure();

    it('should set prop isLoading to false and populate throw error', () => {
      Reducer(UsersReducer).expect(action).toReturnState(expectedState);
    });
  });
});
