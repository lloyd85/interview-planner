import React, { Component } from 'react';
import { array, string, func } from 'prop-types';

class DropDown extends Component {
  static propTypes = {
    value: string,
    onClick: func.isRequired,
    items: array.isRequired,
  };

  static defaultProps = {
    value: 'default',
    onClick: () => null,
  };

  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      value,
      isActive: false,
    };
  }

  onDropDownButtonBlur() {
    const isClickableArea = this.state;

    if (isClickableArea) {
      this.setState({ isActive: isClickableArea, isClickableArea: !isClickableArea });
    }
  }

  onDropDownItemClick(item) {
    return () => {
      this.props.onClick(item);
      this.setState({ value: item, isActive: false });
    }
  }

  verifyClickableArea({ target }) {
    const isClickableArea = (target.className === 'dropdown-item');
    this.setState({ isClickableArea });
  }

  toggleDropDownListVisibility() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    const { items } = this.props;
    const { value, isActive } = this.state;

    const isActiveClass = isActive ? 'is-active' : '';
    const classes = `dropdown ${isActiveClass}`;

    return (
      <div
        className={classes}
        onMouseDown={this.verifyClickableArea.bind(this)}
        onBlur={this.onDropDownButtonBlur.bind(this)}
      >
        <button
          className="dropdown-button"
          onClick={this.toggleDropDownListVisibility.bind(this)}
        >
          <span className="dropdown-button-text">{value}</span>
          {
            isActive ? 'up' : 'down'
          }
        </button>

        {isActiveClass &&
          <div className="dropdown-items">
            {items.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={this.onDropDownItemClick(item).bind(this)}
              >
                {item}
              </button>
            ))}
          </div>
        }
      </div>
    );
  }
}

export default DropDown;
