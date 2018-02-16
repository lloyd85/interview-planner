import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListItem from './ListItem';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/components/List', () => {
  const props = {
    items: ['item1', 'item2', 'item3'],
    item: 'item1',
    listItemContent: false,
    index: 0,
    selectedItem: -1,
    onClick: jest.fn(),
  };

  test('renders a list-item', () => {
    const wrapper = shallow(<ListItem {...props} />);

    expect(wrapper.find('.list-item')).toHaveLength(1);
  });

  test('renders custom list item content when listItemContent prop is set', () => {
    const item = { text: 'item1' };
    const listItemContent = ({ item }) => <div className="custom-content">{item.text}</div>;
    const props = {
      items: ['item1', 'item2', 'item3'],
      item,
      listItemContent,
      index: 0,
      selectedItem: -1,
      onClick: jest.fn(),
    };

    const wrapper = mount(<ListItem {...props} />);
    expect(wrapper.find('.custom-content')).toHaveLength(1);
  });

  test('fires function when clicked', () => {
    const wrapper = shallow(<ListItem {...props} />);

    wrapper.find('.list-item').simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
