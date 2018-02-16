import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import List from './List';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/components/List', () => {
  const items = ['item 1', 'item 2', 'item 3'];

  test('renders a list', () => {
    const wrapper = shallow(<List items={items} />);

    expect(wrapper.find('.list')).toHaveLength(1);
  });

  test('renders 3 list item classes when items prop has 3 items`', () => {
    const wrapper = mount(<List items={items} />);

    expect(wrapper.find('.list-item')).toHaveLength(3);
  });

  test('renders 3 list item classes when items prop has 3 items`', () => {
    const items = [
      { text: 'item1' },
      { text: 'item2' },
      { text: 'item3' },
    ];
    const listItemContent = ({ item }) => <div className="custom-content">{item.text}</div>;

    const wrapper = mount(<List items={items} listItemContent={listItemContent} />);

    expect(wrapper.find('.custom-content')).toHaveLength(3);
  });

  test('renders the first list item class as selected when selectedItem is set to 0', () => {
    const selectedItem = 0;
    const wrapper = mount(<List selectedItem={selectedItem} items={items} />);

    expect(wrapper.find('.is-selected')).toHaveLength(1);
    expect(wrapper.find('.list-item').at(0).hasClass('is-selected')).toBeTruthy();
  });

  test('renders a list name class when name prop is set', () => {
    const wrapper = mount(<List name="custom" items={items} />);

    expect(wrapper.find('.list-name-custom')).toHaveLength(1);
  });
});
