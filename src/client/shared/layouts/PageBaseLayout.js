import React from 'react';
import { node, string, oneOfType, arrayOf } from 'prop-types';

import PageWrapper from './PageWrapper';
import ContentWrapper from './ContentWrapper';
import { Navigation } from '../components';

const PageBaseLayout = ({ name, children }) => (
  <PageWrapper name={name}>
    <Navigation />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </PageWrapper>
);

PageBaseLayout.propTypes = {
  name: string.isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default PageBaseLayout;
