import React, { Component, Children } from 'react';
import { string, func, element, node, oneOfType, object } from 'prop-types';

import { FormValidator } from '../../../helpers';
import { DropDown, Button, Input } from '../../../components';

class Form extends Component {
  static propTypes = {
    name: string.isRequired,
    submitText: string.isRequired,
    resetText: string,
    onSubmit: func.isRequired,
    values: object.isRequired,
    children: oneOfType([element, node]).isRequired,
  };

  static defaultProps = {
    resetText: '',
  };

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.resetFormInputs = this.resetFormInputs.bind(this);
    this.renderFormInputs = this.renderFormInputs.bind(this);
    this.submitFormData = this.submitFormData.bind(this);
  }

  componentWillMount() {
    Object.keys(this.props.values).forEach((key) => {
      this.setState({ [key]: this.props.values[key] });
    });
  }

  onInputChange(field) {
    return ({ target: { value } }) => {
      this.setState({ [field]: value });
    };
  }

  resetFormInputs(event) {
    event.preventDefault();
    Object.keys(this.props.values).forEach((key) => {
      this.setState({ [key]: '' });
    });
  }

  submitFormData() {
    this.props.onSubmit(this.state);
  }

  renderFormInputs(children, v, s) {
    return Children.map(children, (child) => {
      let isValid;
      const {
        validateAs,
        items,
        type,
        name,
        inputType,
        label,
        placeholder,
        disabled,
        message,
        required,
      } = child.props;
      const value = s[name];

      if (inputType === 'dropdown') {
        return <DropDown {...{ items, value }} />;
      }

      if (required) {
        v.addRequiredValues(value);
      }

      switch (validateAs) {
        case 'email':
          isValid = v.validateEmail(value);
          break;
        case 'chars':
          isValid = v.validateChars(value);
          break;
        case 'digits':
          isValid = v.validateDigits(value);
          break;
        default:
          isValid = true;
      }

      return (
        <Input {...{
          value,
          type,
          isValid,
          label,
          placeholder,
          disabled,
          message,
          required,
          onChange: this.onInputChange(name),
        }}
        />
      );
    });
  }

  render() {
    const validator = new FormValidator();
    const {
      name,
      submitText,
      resetText,
      children,
    } = this.props;
    const classes = `$form-name-${name}`;
    const inputs = this.renderFormInputs(children, validator, this.state);
    const isSubmitDisabled = !(validator.existValues() && validator.validate());

    return (
      <div className={classes}>
        <div className="form-input-section">
          {inputs}
        </div>
        <div className="form-button-section">
          {submitText &&
          <Button
            text={submitText}
            disabled={isSubmitDisabled}
            onClick={this.submitFormData}
          />}
          {resetText &&
          <Button
            text={resetText}
            onClick={this.resetFormInputs}
          />}
        </div>
      </div>
    );
  }
}

export default Form;
