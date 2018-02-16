import React, { Fragment } from 'react';
import { array, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Button } from 'shared/components';

const InterviewList = ({ data, removeInterview }) => ((data.length > 0) ?
  <List
    name="interviews"
    items={data}
    listItemContent={({ item }) => (
      <Fragment>
        <Link to={`/interviews/${item._id}`}>{item.role}</Link>
        <Button onClick={() => removeInterview(item._id)} text="Remove" />
      </Fragment>
    )}
  /> : <p>No interviews</p>
);

InterviewList.propTypes = {
  data: array.isRequired,
  removeInterview: func.isRequired,
};

export default InterviewList;
