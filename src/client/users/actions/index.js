import { actionTypes } from '../constants';

const {
  FETCH_USERS_ATTEMPT,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_ATTEMPT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_ATTEMPT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ADD_USER_ATTEMPT,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  REMOVE_USER_ATTEMPT,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
} = actionTypes;

export const fetchUsers = () => ({
  type: FETCH_USERS_ATTEMPT,
});

export const fetchUsersSuccess = payload => ({
  type: FETCH_USERS_SUCCESS,
  payload,
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});

export const fetchUser = id => ({
  type: FETCH_USER_ATTEMPT,
  id,
});

export const fetchUserSuccess = payload => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});

export const updateUser = (id, body) => ({
  type: UPDATE_USER_ATTEMPT,
  id,
  body,
});

export const updateUserSuccess = payload => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: { error },
});

export const addUser = body => ({
  type: ADD_USER_ATTEMPT,
  body,
});

export const addUserSuccess = payload => ({
  type: ADD_USER_SUCCESS,
  payload,
});

export const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  payload: { error },
});

export const removeUser = id => ({
  type: REMOVE_USER_ATTEMPT,
  id,
});

export const removeUserSuccess = payload => ({
  type: REMOVE_USER_SUCCESS,
  payload,
});

export const removeUserFailure = error => ({
  type: REMOVE_USER_FAILURE,
  payload: { error },
});

export default {
  fetchUsers,
  fetchUser,
  updateUser,
  removeUser,
  addUser,
};
