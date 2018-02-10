import React from 'react';
import { string, func, bool } from 'prop-types';

import './Button.scss';

const Button = ({
  text,
  className,
  onClick,
  disabled,
}) => (
  <button
    className={`button ${className} ${disabled ? 'is-disabled' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: string,
  className: string,
  onClick: func.isRequired,
  disabled: bool,
};

Button.defaultProps = {
  text: 'Default',
  className: '',
  disabled: false,
};

export default Button;
