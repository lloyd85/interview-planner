import { createSelector, createStructuredSelector } from 'reselect';

const authSelector = state => state.auth;

const currentUser = createSelector(
  [authSelector],
  authState => authState.currentUser,
);

const token = createSelector(
  [authSelector],
  authState => authState.token,
);

const isLoading = createSelector(
  [authSelector],
  authState => authState.isLoading,
);

const message = createSelector(
  [authSelector],
  authState => authState.message,
);

const status = createSelector(
  [authSelector],
  authState => authState.status,
);

export default createStructuredSelector({
  currentUser,
  token,
  isLoading,
  message,
  status,
});
