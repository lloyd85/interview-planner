import React, { Component } from 'react';
import { bool, string, func } from 'prop-types';

import './Input.scss';

class Input extends Component {
  static propTypes = {
    label: string,
    value: string,
    placeholder: string,
    onChange: func.isRequired,
    type: string,
    isValid: bool,
    disabled: bool,
    message: string,
    required: bool,
  };

  static defaultProps = {
    label: '',
    value: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    message: '',
    isValid: true,
    required: false,
  };

  constructor(props) {
    super(props);

    const { value, isValid } = this.props;

    this.state = { value, isValid };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { required } = this.props;
    const { isValid, value } = nextProps;

    if (value.length > 0) {
      this.setState({ isValid });
    }

    if (isValid && required) {
      this.setState({ isValid: value.length > 0 });
    }
  }

  onChange({ target }) {
    const { isValid, required } = this.props;
    const { value } = target;

    if (value.length > 0) {
      this.setState({ value, isValid });
    }

    if (isValid && required) {
      this.setState({ value, isValid: value.length > 0 });
    }

    this.setState({ value });
    this.props.onChange({ target });
  }

  render() {
    const { value, isValid } = this.state;
    const {
      message,
      type,
      label,
      disabled,
      placeholder,
    } = this.props;
    const isValidClass = isValid ? 'is-valid' : 'is-invalid';
    const isDisabledClass = disabled ? 'is-disabled' : '';
    const classes = `input ${isDisabledClass}`;

    return (
      <div className={`input-field ${isValidClass}`}>
        {label && <div className="input-field-label">{label}</div>}
        <input
          className={classes}
          value={value}
          onChange={this.onChange}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
        />
        {
          (message.length > 0 && !isValid) &&
          <span className="input-field-message">{message}</span>
        }
      </div>
    );
  }
}

export default Input;
