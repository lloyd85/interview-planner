import React from 'react';
import { node, string, oneOfType, arrayOf } from 'prop-types';

const PageWrapper = ({ name, children }) => (
  <div className={`page page-name-${name}`}>
    {children}
  </div>
);

PageWrapper.propTypes = {
  name: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default PageWrapper;
