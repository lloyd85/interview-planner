import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { oneOfType, array, string, bool, func, object } from 'prop-types';

import { FormValidator } from 'shared/helpers';
import { Button, Input } from 'shared/components';
import { ContentLoader } from 'shared/containers';
import { PageBaseLayout } from 'shared/layouts';

import InterviewsSelectors from '../selectors';
import InterviewsActions from '../actions';

@connect(InterviewsSelectors, InterviewsActions)
class InterviewPage extends Component {
  static propTypes = {
    // props
    data: oneOfType([array, object]).isRequired,
    isLoading: bool.isRequired,
    message: string.isRequired,
    match: object.isRequired,

    fetchInterview: func.isRequired,
    updateInterview: func.isRequired,
    removeInterview: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      role: '',
      company: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateInterview = this.updateInterview.bind(this);
    this.removeInterview = this.removeInterview.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchInterview } = this.props;
    fetchInterview(id);
  }

  onInputChange(field) {
    return ({ target: { value } }) => {
      this.setState({ [field]: value });
    };
  }

  updateInterview() {
    const { match: { params: { id } }, updateInterview } = this.props;
    const { role, company } = this.state;

    this.toggleEditMode();
    updateInterview(id, { role, company });
  }

  removeInterview() {
    const { match: { params: { id } }, removeInterview } = this.props;

    removeInterview(id);
  }

  toggleEditMode() {
    const { data } = this.props;
    const { role, company } = data;
    const existsData = typeof data === 'object';
    this.setState({ editMode: !this.state.editMode });

    if (existsData) {
      this.setState({ role, company });
    }
  }

  render() {
    const { isLoading, data, message } = this.props;
    const { editMode, role, company } = this.state;
    const validator = new FormValidator();
    const existsData = typeof data === 'object';

    return (
      <PageBaseLayout name="interview">
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading..." >
          {!editMode ?
            <div className="data-container">
              {existsData ?
                <div>
                  <div>Role: {data.role}</div>
                  <div>Company: {data.company}</div>
                </div>
                :
                <p>No interviews</p>
              }
            </div> :
            <div className="interviews-form-update">
              <Input
                value={role}
                required
                isValid={validator.validateChars(role)}
                onChange={this.onInputChange('role')}
                message="Please enter Chars only"
              />
              <Input
                value={company}
                required
                isValid={validator.validateChars(company)}
                onChange={this.onInputChange('company')}
                message="Please enter Chars only"
              />
            </div>
          }
          <Button
            onClick={editMode ? this.updateInterview : this.toggleEditMode}
            text={editMode ? 'Save' : 'Update'}
            disabled={editMode ? !validator.validate() : false}
          />
          {editMode &&
          <Button
            onClick={this.removeInterview}
            text="Delete"
          />
          }
        </ContentLoader>
        { message === 'Interview successfully deleted' && <Redirect to="/interviews" /> }
      </PageBaseLayout>
    );
  }
}

export default withRouter(InterviewPage);
