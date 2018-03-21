import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { any, object, string } from 'prop-types';

import AuthSelectors from '../selectors';
import AuthActions from '../actions';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props => (jwt.decode(rest.token) ?
      <Component {...{ userId: jwt.decode(rest.token)._id }} {...props} />
      : <Redirect to={{ state: { from: props.location }, pathname: '/' }} />))
    }
  />
);

PrivateRoute.propTypes = {
  token: string.isRequired,
  location: object.isRequired,
  component: any.isRequired,
};

export default connect(AuthSelectors, AuthActions)(PrivateRoute);
