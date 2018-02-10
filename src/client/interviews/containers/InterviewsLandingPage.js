import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { oneOfType, object, array, bool, func } from 'prop-types';

import InterviewsActions from '../actions';
import InterviewsSelectors from '../selectors';

import { Button } from '../../shared/components';

@connect(InterviewsSelectors, InterviewsActions)
class InterviewPage extends Component {
  static propTypes = {
    // props
    data: oneOfType([object, array]).isRequired,
    isLoading: bool.isRequired,

    addInterview: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      role: '',
      company: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.addInterview = this.addInterview.bind(this);
  }

  onInputChange(field) {
    return ({ target: { value } }) => {
      this.setState({ [field]: value });
    };
  }

  addInterview() {
    this.props.addInterview(this.state);
  }

  render() {
    const { role, company } = this.state;
    const { data, isLoading } = this.props;
    return (
      <div>
        <Link to="/interviews">
          Interview List
        </Link>
        <div className="interviews-form-add">
          <input value={role} onChange={this.onInputChange('role')} />
          <input value={company} onChange={this.onInputChange('company')} />
          <Button text="Add Interview" onClick={this.addInterview} />
        </div>
        <div>
          {isLoading ? 'Processing...' :
          <div>
            { data.length > 0 && <p>Message: Data Added successful</p> }
          </div>
          }
        </div>
      </div>
    );
  }
}

export default InterviewPage;
