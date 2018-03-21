import { put, call } from 'redux-saga/effects';
import UsersSagas from './';
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  removeUser,
  removeUserSuccess,
  removeUserFailure,
} from '../actions';

import service from '../services';

describe('Sagas: Users', () => {
  describe('fetchUsers()', () => {
    const action = fetchUsers;
    const gen = UsersSagas().fetchUsers(action);

    it('should make a call to API method fetchUsers()', () => {
      const expected = call(service.fetchUsers);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { results: [
          {
            _id: '0',
            username: 'john.doe',
            password: 'password1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@noname.com',
            interviews: ['123']
          },
          {
            _id: '1',
            role: 'joe.bloggs',
            company: 'password2',
            firstName: 'Joseph',
            lastName: 'Bloggs',
            email: 'joseph.bloggs@noname.com',
            interviews: ['456']
          },
        ] },
      };
      const results = successResponse.data.results;
      const expected = put(fetchUsersSuccess(results));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(fetchUsersFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('fetchUser()', () => {
    const id = '0';
    const action = fetchUser(id);
    const gen = UsersSagas().fetchUser(action);

    it('should make a call to API method fetchUser()', () => {
      const expected = call(service.fetchUser, id);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { results: {
        _id: '0',
        username: 'john.doe',
        password: 'password1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@noname.com',
        interviews: ['123']
      } } };
      const results = successResponse.data.results;
      const expected = put(fetchUserSuccess(results));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(fetchUserFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('updateUser()', () => {
    const id = '0';
    const body = { email: 'new.name@noname.com', firstName: 'Jake' };
    const action = updateUser(id, body);
    const gen = UsersSagas().updateUser(action);

    it('should make a call to API method updateUser()', () => {
      const expected = call(service.updateUser, id, body);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { results: {
        _id: '0',
        username: 'john.doe',
        password: 'password1',
        firstName: 'Jake',
        lastName: 'Doe',
        email: 'new.name@noname.com',
        interviews: ['123']
      } } };
      const results = successResponse.data.results;
      const expected = put(updateUserSuccess(results));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(updateUserFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('addUser()', () => {
    const body = {
      username: 'james.smith',
      password: 'password1',
      firstName: 'James',
      lastName: 'Smith',
      email: 'james.smith@noname.com',
      interviews: [],
    };
    const action = addUser(body);
    const gen = UsersSagas().addUser(action);

    it('should make a call to API method addUser()', () => {
      const expected = call(service.addUser, body);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { message: 'User has been added' } };
      const message = successResponse.data.message;
      const expected = put(addUserSuccess(message));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(addUserFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('removeUser()', () => {
    const id = '0';
    const action = removeUser(id);
    const gen = UsersSagas().removeUser(action);

    it('should make a call to API method removeUser()', () => {
      const expected = call(service.removeUser, id);
      const actual = gen.next().value;

      expect(actual).toEqual(expected);
    });

    it('if the API call is successful it should dispatch a success action', () => {
      const successResponse = { data: { message: 'User has been removed' } };
      const message = successResponse.data.message;
      const expected = put(removeUserSuccess(message));
      const actual = gen.next(successResponse).value;

      expect(actual).toEqual(expected);
    });

    it('if the API call fails it should dispatch a failure action', () => {
      const expected = put(removeUserFailure());
      const actual = gen.throw().value;

      expect(actual).toEqual(expected);
    });
  });
});
