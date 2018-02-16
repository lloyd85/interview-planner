import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InterviewsPage, InterviewPage } from '../containers';

export default () => (
  <Switch>
    <Route exact path="/" component={InterviewsPage} />
    <Route path="/interviews/:id" component={InterviewPage} />
    <Route path="/interviews" component={InterviewsPage} />
  </Switch>
);
