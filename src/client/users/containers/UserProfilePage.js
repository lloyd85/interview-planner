import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { string, bool, func, object } from 'prop-types';

import { FormValidator } from 'shared/helpers';
import { Button, Input } from 'shared/components';
import { ContentLoader } from 'shared/containers';
import { PageBaseLayout } from 'shared/layouts';

import UserSelectors from '../selectors';
import UserActions from '../actions';

@connect(UserSelectors, UserActions)
class UserProfilePage extends Component {
  static propTypes = {
    // props
    userId: string.isRequired,
    data: object.isRequired,
    isLoading: bool.isRequired,
    message: string.isRequired,

    // actions
    fetchUser: func.isRequired,
    updateUser: func.isRequired,
    removeUser: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      firstName: '',
      lastName: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  componentWillMount() {
    const { fetchUser, userId } = this.props;
    fetchUser(userId);
  }

  onInputChange(field) {
    return ({ target: { value } }) => {
      this.setState({ [field]: value });
    };
  }

  updateUser() {
    const { updateUser, userId } = this.props;

    this.toggleEditMode();
    updateUser(userId, this.state);
  }

  removeUser() {
    const { removeUser, userId } = this.props;

    removeUser(userId);
  }

  toggleEditMode() {
    const { data } = this.props;
    const { firstName, lastName } = data;
    this.setState({ editMode: !this.state.editMode });

    if (data.username) {
      this.setState({ firstName, lastName });
    }
  }

  render() {
    const { isLoading, data, message } = this.props;
    const { editMode, firstName, lastName } = this.state;
    const validator = new FormValidator();

    return (
      <PageBaseLayout name="user-profile">
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading..." >
          {!editMode ?
            <div className="data-container">
              <div>Name: {data.firstName} {data.lastName}</div>
            </div> :
            <div className="interviews-form-update">
              <Input
                value={firstName}
                required
                isValid={validator.validateChars(firstName)}
                onChange={this.onInputChange('firstName')}
                message="Please enter Chars only"
              />
              <Input
                value={lastName}
                required
                isValid={validator.validateChars(lastName)}
                onChange={this.onInputChange('lastName')}
                message="Please enter Chars only"
              />
            </div>
          }
          <Button
            onClick={editMode ? this.updateUser : this.toggleEditMode}
            text={editMode ? 'Save' : 'Update'}
            disabled={editMode ? !validator.validate() : false}
          />
          {editMode &&
          <Button
            onClick={this.removeUser}
            text="Delete"
          />
          }
        </ContentLoader>
        { message && <div>{message}</div> }
      </PageBaseLayout>
    );
  }
}

export default withRouter(UserProfilePage);
