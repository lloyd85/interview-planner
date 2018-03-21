import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserProfilePage, UserRegisterPage } from '../containers';
import { PrivateRoute } from '../../auth/routes';

export default () => (
  <Switch>
    <PrivateRoute path="/profile" component={UserProfilePage} />
    <Route path="/register" component={UserRegisterPage} />
  </Switch>
);
