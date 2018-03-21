import Immutable, { merge } from 'seamless-immutable';
import { actionTypes } from '../constants';

export const initialState = Immutable({
  isLoading: false,
  message: '',
  token: '',
  passwordToken: '',
});

const {
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CREATE_PASSWORD_TOKEN_ATTEMPT,
  CREATE_PASSWORD_TOKEN_SUCCESS,
  CREATE_PASSWORD_TOKEN_FAILURE,
  GET_PASSWORD_TOKEN_ATTEMPT,
  GET_PASSWORD_TOKEN_SUCCESS,
  GET_PASSWORD_TOKEN_FAILURE,
  UPDATE_PASSWORD_ATTEMPT,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  LOGOUT_USER,
} = actionTypes;

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case LOGIN_USER_SUCCESS:
      return merge(initialState, { token: action.payload });
    case LOGIN_USER_FAILURE:
      return merge(initialState, { message: 'User could not be authenticated' });

    case LOGOUT_USER:
      return initialState;

    case CREATE_PASSWORD_TOKEN_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case CREATE_PASSWORD_TOKEN_SUCCESS:
      return merge(initialState, { message: action.payload });
    case CREATE_PASSWORD_TOKEN_FAILURE:
      return merge(initialState, { message: 'Password token could not be created' });

    case GET_PASSWORD_TOKEN_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case GET_PASSWORD_TOKEN_SUCCESS:
      return merge(initialState, { passwordToken: action.payload, message: 'Password token successfully retrieved' });
    case GET_PASSWORD_TOKEN_FAILURE:
      return merge(initialState, { message: 'Password token could not be retrieved' });

    case UPDATE_PASSWORD_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case UPDATE_PASSWORD_SUCCESS:
      return merge(initialState, { token: action.payload, message: 'Password successfully updated', passwordToken: '' });
    case UPDATE_PASSWORD_FAILURE:
      return merge(initialState, { message: 'Password could not be updated' });

    default:
      return state;
  }
};

export default AuthReducer;
