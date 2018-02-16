import { createSelector, createStructuredSelector } from 'reselect';

const interviewsSelector = state => state.interviews;

const data = createSelector(
  [interviewsSelector],
  interviewsState => interviewsState.data,
);

const isLoading = createSelector(
  [interviewsSelector],
  interviewsState => interviewsState.isLoading,
);

const message = createSelector(
  [interviewsSelector],
  interviewsState => interviewsState.message,
);

const status = createSelector(
  [interviewsSelector],
  interviewsState => interviewsState.status,
);

const formValues = createSelector(
  [interviewsSelector],
  interviewsState => interviewsState.formValues,
);

export default createStructuredSelector({
  data,
  isLoading,
  message,
  status,
  formValues,
});
