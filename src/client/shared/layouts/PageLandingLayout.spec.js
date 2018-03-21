import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContentWrapper from './ContentWrapper';
import PageWrapper from './PageWrapper';
import PageLandingLayout from './PageLandingLayout';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/layouts/PageLandingLayout', () => {

  test('should render a header and a paragraph tag based on the children', () => {
    const wrapper = shallow(
      <PageLandingLayout name="test">
        <p>Test</p>
      </PageLandingLayout>
    );

    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find(ContentWrapper)).toHaveLength(1);
    expect(wrapper.find(PageWrapper)).toHaveLength(1);
  });
});
