import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { string, func } from 'prop-types';

import { Form } from 'shared/components';
import { PageLandingLayout } from 'shared/layouts';

import AuthSelectors from '../selectors';
import AuthActions from '../actions';

@connect(AuthSelectors, AuthActions)
class LoginPage extends Component {
  static propTypes = {
    // props
    token: string.isRequired,
    message: string.isRequired,

    loginUser: func.isRequired,
  };

  render() {
    const { message, loginUser } = this.props;

    if (this.props.token) {
      return <Redirect to="/interviews" />;
    }

    return (
      <PageLandingLayout name="login">
        <Link to="/register">Signup</Link>
        <Form
          name="login"
          submitText="Login"
          onSubmit={loginUser}
          values={{ username: '', password: '' }}
        >
          <field
            name="username"
            required
            message="Please enter valid username"
          />
          <field
            name="password"
            required
            message="Please enter valid password"
            type="password"
          />
        </Form>
        { message && <p>{ message }</p> }
        <Link to="/forgot">Forgotten Password</Link>
      </PageLandingLayout>
    );
  }
}

export default LoginPage;
