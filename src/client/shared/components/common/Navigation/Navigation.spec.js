import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from './Navigation';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/components/Navigation', () => {
  test('should render a nav tag', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.find('nav')).toHaveLength(1);
  });
});