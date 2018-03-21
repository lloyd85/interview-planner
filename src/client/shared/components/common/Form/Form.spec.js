import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { Input } from '../../../components';
import Form from './Form';

describe('shared/components/common/Form', () => {
  test('renders ', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <Form
        name="custom"
        submitText="submit"
        resetText="reset"
        onSubmit={onSubmit}
        values={{ name: 'name', email: 'email' }}
      >
        <input
          name="name"
          required
          type="text"
          validateAs="email"
          message="Message"
        />
        <input
          name="email"
          required
          type="text"
          validateAs="email"
          message="Message"
        />
      </Form>
    );

    expect(wrapper.find(Input)).toHaveLength(2);
  });
});