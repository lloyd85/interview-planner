import React from 'react';
import { array, func, string, element, node, object, number, bool, oneOfType } from 'prop-types';

const ListItem = ({
  items,
  item,
  listItemContent,
  index,
  selectedItem,
  onClick,
}) => {
  const isSelected = selectedItem === index;
  const isSelectedClass = isSelected && items.length > 1 ? 'is-selected' : '';
  const className = `list-item ${isSelectedClass}`;
  const content = listItemContent ? listItemContent({ item }) : item;
  const props = { className };

  if (onClick) { props.onClick = () => onClick(item); }

  return <li {...props}>{content}</li>;
};

ListItem.propTypes = {
  items: array.isRequired,
  item: oneOfType([string, object, number]).isRequired,
  listItemContent: oneOfType([bool, func, node, object, element]).isRequired,
  index: number.isRequired,
  selectedItem: number.isRequired,
  onClick: oneOfType([bool, func]).isRequired,
};

export default ListItem;
