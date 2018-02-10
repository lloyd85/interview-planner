import React from 'react';
import { node, string, oneOfType, arrayOf } from 'prop-types';

import { Navigation } from '../components';

const PageBaseLayout = ({ name, children }) => (
  <div className={`page page-name-${name}`}>
    <Navigation />
    <div className="content">
      {children}
    </div>
  </div>
);

PageBaseLayout.propTypes = {
  name: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default PageBaseLayout;
