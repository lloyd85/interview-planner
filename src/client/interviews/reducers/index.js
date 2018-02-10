import Immutable from 'seamless-immutable';
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
      return state
        .set('isLoading', true)
        .set('message', '')
        .set('data', []);
    case FETCH_INTERVIEWS_SUCCESS:
      return state
        .set('isLoading', false)
        .set('data', action.payload);
    case FETCH_INTERVIEWS_FAILURE:
      return state
        .set('isLoading', false)
        .set('message', 'Interview\'s could not be loaded')
        .set('data', []);

    case FETCH_INTERVIEW_ATTEMPT:
      return state
        .set('isLoading', true)
        .set('message', '')
        .set('data', {});
    case FETCH_INTERVIEW_SUCCESS:
      return state
        .set('isLoading', false)
        .set('data', action.payload);
    case FETCH_INTERVIEW_FAILURE:
      return state
        .set('isLoading', false)
        .set('message', 'Interview could not be loaded')
        .set('data', {});

    case UPDATE_INTERVIEW_ATTEMPT:
      return state
        .set('isLoading', true)
        .set('message', '')
        .set('data', {});
    case UPDATE_INTERVIEW_SUCCESS:
      return state
        .set('isLoading', false)
        .set('data', action.payload);
    case UPDATE_INTERVIEW_FAILURE:
      return state
        .set('isLoading', false)
        .set('message', 'Interview could not be updated')
        .set('data', {});

    case ADD_INTERVIEW_ATTEMPT:
      return state
        .set('isLoading', true)
        .set('message', '')
        .set('data', []);
    case ADD_INTERVIEW_SUCCESS:
      return state
        .set('isLoading', false)
        .set('data', action.payload);
    case ADD_INTERVIEW_FAILURE:
      return state
        .set('isLoading', false)
        .set('message', 'Interview could not be updated')
        .set('data', []);

    case REMOVE_INTERVIEW_ATTEMPT:
      return state
        .set('isLoading', true)
        .set('message', '')
        .set('data', []);
    case REMOVE_INTERVIEW_SUCCESS:
      return state
        .set('isLoading', false)
        .set('data', action.payload);
    case REMOVE_INTERVIEW_FAILURE:
      return state
        .set('isLoading', false)
        .set('message', 'Interview could not be deleted')
        .set('data', []);

    default:
      return state;
  }
};

export default InterviewsReducer;
