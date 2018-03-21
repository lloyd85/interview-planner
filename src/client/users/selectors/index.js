import { createSelector, createStructuredSelector } from 'reselect';

const usersSelector = state => state.users;

const data = createSelector(
  [usersSelector],
  usersState => usersState.data,
);

const status = createSelector(
  [usersSelector],
  usersState => usersState.status,
);

const isLoading = createSelector(
  [usersSelector],
  usersState => usersState.isLoading,
);

const message = createSelector(
  [usersSelector],
  usersState => usersState.message,
);

export default createStructuredSelector({
  data,
  status,
  isLoading,
  message,
});
