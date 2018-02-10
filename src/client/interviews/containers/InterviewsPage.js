import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { string, array, bool, func, object, oneOfType } from 'prop-types';

import InterviewsSelectors from '../selectors';
import InterviewsActions from '../actions';

// import { InterviewsForm } from 'interviews/components';

@connect(InterviewsSelectors, InterviewsActions)
class InterviewsPage extends Component {
  static propTypes = {
    // props
    data: oneOfType([object, array]).isRequired,
    message: string.isRequired,
    isLoading: bool.isRequired,
    // formValues: object.isRequired,
    match: object.isRequired,

    fetchInterviews: func.isRequired,
    // addInterview: func.isRequired,
  };

  componentDidMount() {
    this.props.fetchInterviews();
  }

  render() {
    const {
      isLoading,
      data,
      message,
      match: { url },
      /* , addInterview, formValues */
    } = this.props;
    const existsInterviews = data.length > 0;

    return (
      <div>
        <h1>Interview List</h1>
        {/* <InterviewsForm values={formValues} onSubmit={addInterview} /> */}
        <div>
          { isLoading ? <p>Is loading...</p> :
          <div>
            { existsInterviews ? (
              <ul>
                {
                  data.map((interview, i) => (
                    <li key={i}>
                      <Link to={`${url}/${interview.id}`}>
                        {interview.role}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            ) : <p>No interviews</p>
            }
          </div>
          }
          { message !== '' && <p>Message: { message }</p> }
        </div>
      </div>
    );
  }
}

export default withRouter(InterviewsPage);
