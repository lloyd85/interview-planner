import Immutable, { merge } from 'seamless-immutable';
import { actionTypes } from '../constants';

export const initialState = Immutable({
  isLoading: false,
  message: '',
  data: {},
  status: '',
});

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

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case FETCH_USERS_SUCCESS:
      return merge(initialState, { data: action.payload });
    case FETCH_USERS_FAILURE:
      return merge(initialState, { message: 'Users could not be loaded' });

    case FETCH_USER_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case FETCH_USER_SUCCESS:
      return merge(initialState, { data: action.payload });
    case FETCH_USER_FAILURE:
      return merge(initialState, { message: 'User could not be loaded' });

    case UPDATE_USER_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case UPDATE_USER_SUCCESS:
      return merge(initialState, { data: action.payload });
    case UPDATE_USER_FAILURE:
      return merge(initialState, { message: 'User could not be updated' });

    case ADD_USER_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case ADD_USER_SUCCESS:
      return merge(initialState, { status: action.payload });
    case ADD_USER_FAILURE:
      return merge(initialState, { message: 'User could not be added' });

    case REMOVE_USER_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case REMOVE_USER_SUCCESS:
      return merge(initialState, { message: action.payload });
    case REMOVE_USER_FAILURE:
      return merge(initialState, { message: 'User could not be removed' });
    default:
      return state;
  }
};

export default UsersReducer;
