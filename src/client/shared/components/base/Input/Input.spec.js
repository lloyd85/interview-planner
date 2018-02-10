import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from './Input';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/components/Input', () => {
  test('renders have an `.input-field`', () => {
    const wrapper = shallow(<Input onChange={() => null} />);

    expect(wrapper.find('.input-field')).toHaveLength(1);
  });

  test('should render an input field label class', () => {
    const wrapper = shallow(<Input label="Label" onChange={() => null} />);

    expect(wrapper.find('.input-field-label')).toHaveLength(1);
  });

  test('should not render an input field label when label prop is not set', () => {
    const wrapper = shallow(<Input onChange={() => null} />);

    expect(wrapper.find('.input-field-label')).toHaveLength(0);
  });

  test('should render an input field label with text "Label" from label prop', () => {
    const wrapper = shallow(<Input label="Label" onChange={() => null} />);

    expect(wrapper.find('.input-field-label').text()).toEqual('Label');
  });

  test('should render an .is-valid class when isValid prop is TRUE', () => {
    const wrapper = shallow(<Input isValid onChange={() => null} />);

    expect(wrapper.find('.is-valid')).toHaveLength(1);
  });

  test('should render an .is-invalid class when isValid prop is FALSE', () => {
    const wrapper = shallow(<Input isValid={false} onChange={() => null} />);

    expect(wrapper.find('.is-invalid')).toHaveLength(1);
  });

  test('should render a message when message prop is set and isValid prop is FALSE', () => {
    const wrapper = shallow(<Input isValid={false} message="Not valid" onChange={() => null} />);

    expect(wrapper.find('.input-field-message')).toHaveLength(1);
    expect(wrapper.find('.input-field-message').text()).toEqual('Not valid');
  });

  test('should not render a message when message prop is not set and isValid prop is FALSE', () => {
    const wrapper = shallow(<Input isValid={false} onChange={() => null} />);

    expect(wrapper.find('.input-field-message')).toHaveLength(0);
  });

  test('should not render a message when message prop is set and isValid prop is TRUE', () => {
    const wrapper = shallow(<Input isValid message="Not valid" onChange={() => null} />);

    expect(wrapper.find('.input-field-message')).toHaveLength(0);
  });

  test('should render an .is-disabled class when disabled prop is TRUE', () => {
    const wrapper = shallow(<Input disabled onChange={() => null} />);

    expect(wrapper.find('.is-disabled')).toHaveLength(1);
  });

  test('should fire callback when input has changed', () => {
    const callback = jest.fn();
    const wrapper = mount(<Input onChange={callback} />);

    wrapper.find('input').simulate('change');

    expect(callback).toHaveBeenCalled();
  });
});
