import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { object, func, string, bool } from 'prop-types';

import { Form } from 'shared/components';
import { ContentLoader } from 'shared/containers';
import { PageLandingLayout } from 'shared/layouts';

import AuthSelectors from '../selectors';
import AuthActions from '../actions';

@connect(AuthSelectors, AuthActions)
class ResetPasswordPage extends Component {
  static propTypes = {
    // props
    isLoading: bool.isRequired,
    message: string.isRequired,
    token: string.isRequired,
    passwordToken: string.isRequired,
    match: object.isRequired,

    // actions
    getPasswordToken: func.isRequired,
    updatePassword: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: props.match.params.token,
    };

    this.updatePassword = this.updatePassword.bind(this);
  }

  componentWillMount() {
    this.props.getPasswordToken(this.state.token);
  }

  updatePassword(formValues) {
    this.props.updatePassword(this.state.token, formValues);
  }

  render() {
    const { message, isLoading, passwordToken } = this.props;

    if (message === 'Password successfully updated') {
      return (
        <div>
          <p>{message}</p>
          <Link to="/">Back to home</Link>
        </div>
      );
    }

    if (!isLoading && !passwordToken && !message) {
      return <Redirect to="/" />;
    }

    return (
      <PageLandingLayout name="reset-password">
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading...">
          <Form
            name="reset-password"
            submitText="Submit"
            onSubmit={this.updatePassword}
            values={{ password: '' }}
          >
            <field label="Password" name="password" required type="password" />
          </Form>
        </ContentLoader>
        { message && <p>{message}</p> }
      </PageLandingLayout>
    );
  }
}

export default withRouter(ResetPasswordPage);
