import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DropDown from './DropDown';

Enzyme.configure({ adapter: new Adapter() });

const items = [ 'text1', 'text2', 'text3' ];
const value = 'value';
const customFunction = jest.fn();

describe('shared/components/base/DropDown', () => {
  it('should render a dropdown, dropdown button, dropdown button text, dropdown items class', () => {
    const wrapper = mount(<DropDown items={items} value={value} onClick={customFunction} />);
    expect(wrapper.find('.dropdown')).toHaveLength(1);
  });

  it('should call customFunction and hide dropdown list when dropdown item is clicked', () => {
    const wrapper = shallow(<DropDown items={items} value={value} onClick={customFunction} />);

    wrapper.find('.dropdown-button').simulate('click');
    wrapper.find('.dropdown-item').at(0).simulate('click');

    expect(wrapper.find('.dropdown-items')).toHaveLength(0);
    expect(wrapper.find('.dropdown-item')).toHaveLength(0);

    expect(customFunction).toHaveBeenCalled();
  });

  it('should update value to first item value clicked', () => {
    const wrapper = shallow(<DropDown items={items} value={value} onClick={customFunction} />);

    wrapper.find('.dropdown-button').simulate('click');
    wrapper.find('.dropdown-item').at(0).simulate('click');

    expect(wrapper.find('.dropdown-button-text').text()).toBe(items[0]);
  });
});
