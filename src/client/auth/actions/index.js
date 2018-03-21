import { actionTypes } from '../constants';

const {
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  CREATE_PASSWORD_TOKEN_ATTEMPT,
  CREATE_PASSWORD_TOKEN_SUCCESS,
  CREATE_PASSWORD_TOKEN_FAILURE,
  GET_PASSWORD_TOKEN_ATTEMPT,
  GET_PASSWORD_TOKEN_SUCCESS,
  GET_PASSWORD_TOKEN_FAILURE,
  UPDATE_PASSWORD_ATTEMPT,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} = actionTypes;

export const loginUser = body => ({
  type: LOGIN_USER_ATTEMPT,
  body,
});

export const loginUserSuccess = payload => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserFailure = error => ({
  type: LOGIN_USER_FAILURE,
  payload: { error },
});

export const createPasswordToken = body => ({
  type: CREATE_PASSWORD_TOKEN_ATTEMPT,
  body,
});

export const createPasswordTokenSuccess = payload => ({
  type: CREATE_PASSWORD_TOKEN_SUCCESS,
  payload,
});

export const createPasswordTokenFailure = error => ({
  type: CREATE_PASSWORD_TOKEN_FAILURE,
  payload: { error },
});

export const getPasswordToken = token => ({
  type: GET_PASSWORD_TOKEN_ATTEMPT,
  token,
});

export const getPasswordTokenSuccess = payload => ({
  type: GET_PASSWORD_TOKEN_SUCCESS,
  payload,
});

export const getPasswordTokenFailure = error => ({
  type: GET_PASSWORD_TOKEN_FAILURE,
  payload: { error },
});

export const updatePassword = (token, body) => ({
  type: UPDATE_PASSWORD_ATTEMPT,
  token,
  body,
});

export const updatePasswordSuccess = payload => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload,
});

export const updatePasswordFailure = error => ({
  type: UPDATE_PASSWORD_FAILURE,
  payload: { error },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export default {
  loginUser,
  logoutUser,
  createPasswordToken,
  getPasswordToken,
  updatePassword,
};
