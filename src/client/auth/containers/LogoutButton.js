import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { func, string } from 'prop-types';

import { Button } from 'shared/components';
import AuthSelectors from '../selectors';
import AuthActions from '../actions';

const LogoutButton = ({ logoutUser, token }) => {
  if (token === '') {
    return <Redirect to="/" />;
  }

  return <Button text="Logout" onClick={logoutUser} />;
};

LogoutButton.propTypes = {
  token: string.isRequired,
  logoutUser: func.isRequired,
};

export default connect(AuthSelectors, AuthActions)(LogoutButton);
