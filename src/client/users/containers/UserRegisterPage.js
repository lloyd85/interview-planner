import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { string, bool, func } from 'prop-types';

import { FormValidator } from 'shared/helpers';
import { Button, Input } from 'shared/components';
import { ContentLoader } from 'shared/containers';
import { PageLandingLayout } from 'shared/layouts';

import UsersSelectors from '../selectors';
import UsersActions from '../actions';

@connect(UsersSelectors, UsersActions)
class UserRegisterPage extends Component {
  static propTypes = {
    // props
    isLoading: bool.isRequired,
    status: string.isRequired,
    message: string.isRequired,

    addUser: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      dob: '',
      street: '',
      city: '',
      postcode: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  onInputChange(field) {
    return ({ target: { value } }) => {
      this.setState({ [field]: value });
    };
  }

  submitUser() {
    const { addUser } = this.props;

    addUser(this.state);
  }

  render() {
    const { isLoading, status, message } = this.props;
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      phone,
      dob,
      street,
      city,
      postcode,
    } = this.state;
    const validator = new FormValidator();

    if (status) {
      return <Redirect to="/" />;
    }

    return (
      <PageLandingLayout name="register-user">
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading..." >
          <div className="user-form-register">
            <Input
              value={firstName}
              label="First Name"
              required
              isValid={validator.validateChars(firstName)}
              onChange={this.onInputChange('firstName')}
              message="Please enter Chars only"
            />
            <Input
              value={lastName}
              label="Last Name"
              required
              isValid={validator.validateChars(lastName)}
              onChange={this.onInputChange('lastName')}
              message="Please enter Chars only"
            />
            <Input
              value={username}
              label="Username"
              required
              // isValid={validator.validateChars(username)}
              onChange={this.onInputChange('username')}
              message="Please enter Chars only"
            />
            <Input
              value={password}
              label="Password"
              type="password"
              required
              // isValid={validator.validateChars(password)}
              onChange={this.onInputChange('password')}
              message="Please enter Chars only"
            />
            <Input
              value={email}
              label="Email"
              required
              isValid={validator.validateEmail(email)}
              onChange={this.onInputChange('email')}
              message="Please enter Chars only"
            />
            <Input
              value={phone}
              label="Phone"
              required
              isValid={validator.validateDigits(phone)}
              onChange={this.onInputChange('phone')}
              message="Please enter Chars only"
            />
            <Input
              value={dob}
              label="Date of birth"
              required
              // isValid={validator.validateChars(dob)}
              onChange={this.onInputChange('dob')}
              message="Please enter Chars only"
            />
            <Input
              value={street}
              label="Street"
              required
              // isValid={validator.validateChars(street)}
              onChange={this.onInputChange('street')}
              message="Please enter Chars only"
            />
            <Input
              value={city}
              label="City"
              required
              isValid={validator.validateChars(city)}
              onChange={this.onInputChange('city')}
              message="Please enter Chars only"
            />
            <Input
              value={postcode}
              label="Postcode"
              required
              // isValid={validator.validateChars(postcode)}
              onChange={this.onInputChange('postcode')}
              message="Please enter Chars only"
            />
          </div>
          <Button
            onClick={this.submitUser}
            text="Submit"
            disabled={!validator.validate()}
          />
          { message && <p>{message}</p> }
        </ContentLoader>
      </PageLandingLayout>
    );
  }
}

export default UserRegisterPage;
