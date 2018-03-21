import React from 'react';
import { node, oneOfType, arrayOf } from 'prop-types';

const ContentWrapper = ({ children }) => (
  <div className="content">
    {children}
  </div>
);

ContentWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default ContentWrapper;
