import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, bool } from 'prop-types';

import { Form } from 'shared/components';
import { ContentLoader } from 'shared/containers';
import { PageLandingLayout } from 'shared/layouts';

import AuthSelectors from '../selectors';
import AuthActions from '../actions';

@connect(AuthSelectors, AuthActions)
class ForgotPasswordPage extends Component {
  static propTypes = {
    // props
    isLoading: bool.isRequired,
    message: string.isRequired,

    // actions
    createPasswordToken: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.createPasswordToken = this.createPasswordToken.bind(this);
  }

  createPasswordToken(formValues) {
    this.props.createPasswordToken(formValues);
  }

  render() {
    const { message, isLoading } = this.props;

    return (
      <PageLandingLayout name="reset-password">
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading...">
          <Form
            name="forgot-password"
            submitText="Submit"
            onSubmit={this.createPasswordToken}
            values={{ email: '' }}
          >
            <field
              label="Email"
              name="email"
              validateAs="email"
              required
              type="text"
              message="Please enter valid email"
            />
          </Form>
        </ContentLoader>
        { message && <p>{message}</p> }
      </PageLandingLayout>
    );
  }
}

export default ForgotPasswordPage;
