import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InterviewsPage, InterviewPage } from '../containers';
import InterviewsLandingPage from '../containers/InterviewsLandingPage';

export default () => (
  <Switch>
    <Route exact path="/" component={InterviewsLandingPage} />
    <Route path="/interviews/:id" component={InterviewPage} />
    <Route path="/interviews" component={InterviewsPage} />
  </Switch>
);
