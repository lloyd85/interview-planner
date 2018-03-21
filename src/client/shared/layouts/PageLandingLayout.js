import React from 'react';
import { node, string, oneOfType, arrayOf } from 'prop-types';

import PageWrapper from './PageWrapper';
import ContentWrapper from './ContentWrapper';

const PageLandingLayout = ({ name, children }) => (
  <PageWrapper name={name}>
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </PageWrapper>
);

PageLandingLayout.propTypes = {
  name: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default PageLandingLayout;
