import React, { Component } from 'react';
import { connect } from 'react-redux';
import { oneOfType, object, array, bool, func } from 'prop-types';

import { ContentLoader } from 'shared/containers';
import { PageBaseLayout } from 'shared/layouts';

import InterviewsActions from '../actions';
import InterviewsSelectors from '../selectors';

import { InterviewList, InterviewsAddForm } from '../components';
import { LogoutButton } from '../../auth/containers';

@connect(InterviewsSelectors, InterviewsActions)
class InterviewPage extends Component {
  static propTypes = {
    // props
    data: oneOfType([object, array]).isRequired,
    isLoading: bool.isRequired,

    // actions
    fetchInterviews: func.isRequired,
    addInterview: func.isRequired,
    removeInterview: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      role: '',
      company: '',
    };
  }

  componentWillMount() {
    this.props.fetchInterviews();
  }

  onInputChange(field) {
    return ({ target: { value } }) => {
      this.setState({ [field]: value });
    };
  }

  addInterview() {
    this.setState({ role: '', company: '' });
    this.props.addInterview(this.state);
  }

  render() {
    const { data, isLoading, removeInterview } = this.props;

    return (
      <PageBaseLayout name="interviews">
        <LogoutButton />
        <InterviewsAddForm
          values={this.state}
          onInputChange={this.onInputChange.bind(this)}
          onSubmit={this.addInterview.bind(this)}
        />
        <ContentLoader isLoading={isLoading} contentLoaderText="Is Loading...">
          <InterviewList data={data} removeInterview={removeInterview} />
        </ContentLoader>
      </PageBaseLayout>
    );
  }
}

export default InterviewPage;
