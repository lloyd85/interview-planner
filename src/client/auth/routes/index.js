import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from '../containers';
import PrivateRoute from './PrivateRoute';

export { PrivateRoute };

export default () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/forgot" component={ForgotPasswordPage} />
    <Route exact path="/reset/:token" component={ResetPasswordPage} />
  </Switch>
);
