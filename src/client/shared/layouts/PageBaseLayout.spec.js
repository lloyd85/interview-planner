import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PageBaseLayout from './PageBaseLayout';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/layout/PageBaseLayout', () => {
  test('should render a page-name class named test from name prop', () => {
    const wrapper = shallow(
      <PageBaseLayout name="test">
        <h1>Headline</h1>
        <div>Test</div>
      </PageBaseLayout>
    );

    expect(wrapper.find('.page-name-test')).toHaveLength(1);
  });

  test('should render a header and a paragraph tag based on the children', () => {
    const wrapper = shallow(
      <PageBaseLayout name="test">
        <h1>Headline</h1>
        <p>Test</p>
      </PageBaseLayout>
    );

    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
  });
});
