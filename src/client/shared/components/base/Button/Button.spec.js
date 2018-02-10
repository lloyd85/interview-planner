import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './Button';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/components/Button', () => {
  test('should render a button tag', () => {
    const wrapper = shallow(<Button onClick={() => null} />);

    expect(wrapper.find('button')).toHaveLength(1);
  });

  test('should render default text', () => {
    const wrapper = shallow(<Button onClick={() => null} />);

    expect(wrapper.find('button').text()).toEqual('Default');
  });

  test('should render text "Click me" from text prop', () => {
    const wrapper = shallow(<Button onClick={() => null} text="Click me" />);

    expect(wrapper.find('button').text()).toEqual('Click me');
  });

  test('should render button tag with custom class when className prop is set', () => {
    const wrapper = shallow(<Button onClick={() => null} className="custom-class" />);

    expect(wrapper.find('button').hasClass('custom-class')).toBeTruthy();
  });

  test('should render button tag with disabled class when disabled prop is set', () => {
    const wrapper = shallow(<Button onClick={() => null} disabled />);

    expect(wrapper.find('button').hasClass('is-disabled')).toBeTruthy();
  });

  test('should fire callback when button is clicked', () => {
    const callback = jest.fn();
    const wrapper = shallow(<Button onClick={callback} />);

    wrapper.find('button').simulate('click');

    expect(callback).toHaveBeenCalled();
  });
});