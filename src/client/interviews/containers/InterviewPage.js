import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { oneOfType, array, string, bool, func, object } from 'prop-types';

import InterviewsSelectors from '../selectors';
import InterviewsActions from '../actions';

import { FormValidator } from '../../shared/helpers';
import { Button, Input } from '../../shared/components';
import { ContentLoader } from '../../shared/containers';
import { PageBaseLayout } from '../../shared/layouts';

@connect(InterviewsSelectors, InterviewsActions)
class InterviewPage extends Component {
  static propTypes = {
    // props
    data: oneOfType([array, object]).isRequired,
    message: string.isRequired,
    isLoading: bool.isRequired,
    match: object.isRequired,

    fetchInterview: func.isRequired,
    updateInterview: func.isRequired,
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

  toggleEditMode() {
    const { data } = this.props;
    const { role, company } = data;
    this.setState({ editMode: !this.state.editMode });

    if (data) {
      this.setState({ role, company });
    }
  }

  render() {
    const { isLoading, data, message } = this.props;
    const { editMode, role, company } = this.state;
    const validator = new FormValidator();

    return (
      <PageBaseLayout name="interview">
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading..." >
          {!editMode ?
            <div className="data-container">
              {data ?
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
        </ContentLoader>
        { message !== '' && <p>Message: { message }</p> }
      </PageBaseLayout>
    );
  }
}

export default withRouter(InterviewPage);
