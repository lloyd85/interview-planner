import React from 'react';
import { number, array, string, func, bool, element, oneOfType } from 'prop-types';

import ListItem from './ListItem';

const listItemRenderer = props => props.items.map((item, index) => {
  const listItemProps = Object.assign(props, { index, item });

  return <ListItem key={index} {...listItemProps} />;
});

const List = ({
  items,
  onClick,
  selectedItem,
  listItemContent,
  name,
}) => {
  const listNameClass = name ? `list-name-${name}` : '';
  const classes = `list ${listNameClass}`;

  return (
    <ul className={classes}>
      {listItemRenderer({
        items, onClick, selectedItem, listItemContent,
      })}
    </ul>
  );
};

List.propTypes = {
  items: array.isRequired,
  selectedItem: number,
  name: string,
  onClick: oneOfType([bool, func]),
  listItemContent: oneOfType([element, func, bool]),
};

List.defaultProps = {
  selectedItem: -1,
  name: 'none',
  onClick: false,
  listItemContent: false,
};

export default List;
