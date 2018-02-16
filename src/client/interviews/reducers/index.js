import Immutable, { merge } from 'seamless-immutable';
import { actionTypes } from '../constants';

export const initialState = Immutable({
  isLoading: false,
  message: '',
  data: [],
  formValues: {
    role: '',
    company: '',
  },
});

const {
  FETCH_INTERVIEWS_ATTEMPT,
  FETCH_INTERVIEWS_SUCCESS,
  FETCH_INTERVIEWS_FAILURE,
  FETCH_INTERVIEW_ATTEMPT,
  FETCH_INTERVIEW_SUCCESS,
  FETCH_INTERVIEW_FAILURE,
  UPDATE_INTERVIEW_ATTEMPT,
  UPDATE_INTERVIEW_SUCCESS,
  UPDATE_INTERVIEW_FAILURE,
  ADD_INTERVIEW_ATTEMPT,
  ADD_INTERVIEW_SUCCESS,
  ADD_INTERVIEW_FAILURE,
  REMOVE_INTERVIEW_ATTEMPT,
  REMOVE_INTERVIEW_SUCCESS,
  REMOVE_INTERVIEW_FAILURE,
} = actionTypes;

const InterviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERVIEWS_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case FETCH_INTERVIEWS_SUCCESS:
      return merge(initialState, { data: action.payload });
    case FETCH_INTERVIEWS_FAILURE:
      return merge(initialState, { message: 'Interviews could not be loaded' });

    case FETCH_INTERVIEW_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case FETCH_INTERVIEW_SUCCESS:
      return merge(initialState, { data: action.payload });
    case FETCH_INTERVIEW_FAILURE:
      return merge(initialState, { message: 'Interview could not be loaded' });

    case UPDATE_INTERVIEW_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case UPDATE_INTERVIEW_SUCCESS:
      return merge(initialState, { data: action.payload });
    case UPDATE_INTERVIEW_FAILURE:
      return merge(initialState, { message: 'Interview could not be updated' });

    case ADD_INTERVIEW_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case ADD_INTERVIEW_SUCCESS:
      return merge(initialState, { message: action.payload });
    case ADD_INTERVIEW_FAILURE:
      return merge(initialState, { message: 'Interview could not be added' });
    case REMOVE_INTERVIEW_ATTEMPT:
      return merge(initialState, { isLoading: true });
    case REMOVE_INTERVIEW_SUCCESS:
      return merge(initialState, { message: action.payload });
    case REMOVE_INTERVIEW_FAILURE:
      return merge(initialState, { message: 'Interview could not be removed' });
    default:
      return state;
  }
};

export default InterviewsReducer;
