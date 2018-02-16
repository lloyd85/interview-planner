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

    this.state = { value, isValid, isValueEmpty: false };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isValid, value } = nextProps;

    if (value.length > 0) {
      this.setState({ isValid });
    }
  }

  onChange({ target }) {
    const { value } = target;

    this.setState({ value, isValueEmpty: false });

    this.props.onChange({ target });
  }

  onBlur({ target }) {
    if (target.value.length === 0 && this.props.required) {
      this.setState({ isValueEmpty: true });
    }
  }

  render() {
    const { value, isValid, isValueEmpty } = this.state;
    const {
      message,
      type,
      label,
      disabled,
      placeholder,
    } = this.props;
    const isValidClass = (value.length === 0 || isValid) ? 'is-valid' : 'is-invalid';
    const isDisabledClass = disabled ? 'is-disabled' : '';
    const classes = `input ${isDisabledClass}`;

    return (
      <div className={`input-field ${isValidClass}`}>
        {label && <div className="input-field-label">{label}</div>}
        <input
          className={classes}
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
        />
        {(message.length > 0 && !isValid && value.length > 0) &&
          <span className="input-field-message">{message}</span>
        }
        {isValueEmpty &&
          <span className="input-field-message">Field is required</span>
        }
      </div>
    );
  }
}

export default Input;
