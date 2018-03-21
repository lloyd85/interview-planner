import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Navigation } from '../components';
import ContentWrapper from './ContentWrapper';
import PageWrapper from './PageWrapper';
import PageBaseLayout from './PageBaseLayout';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/layouts/PageBaseLayout', () => {

  test('should render a header and a paragraph tag based on the children', () => {
    const wrapper = shallow(
      <PageBaseLayout name="test">
        <p>Test</p>
      </PageBaseLayout>
    );

    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find(ContentWrapper)).toHaveLength(1);
    expect(wrapper.find(PageWrapper)).toHaveLength(1);
    expect(wrapper.find(Navigation)).toHaveLength(1);
  });
});
