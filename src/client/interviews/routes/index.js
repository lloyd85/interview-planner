import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../../auth/routes';
import { InterviewsPage, InterviewPage } from '../containers';

export default () => (
  <Switch>
    <PrivateRoute path="/interviews/:id" component={InterviewPage} />
    <PrivateRoute path="/interviews" component={InterviewsPage} />
  </Switch>
);
