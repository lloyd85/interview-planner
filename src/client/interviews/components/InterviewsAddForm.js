import React from 'react';
import { func, object } from 'prop-types';

import { FormValidator } from 'shared/helpers';
import { Button, Input } from 'shared/components';

const InterviewsAddForm = ({
  values: { role, company },
  onInputChange,
  onSubmit,
}) => {
  const validator = new FormValidator();
  const isRoleValid = validator.validateChars(role);
  const isCompanyValid = validator.validateChars(company);
  const isFormValid = !(validator.validate() && validator.existValues([role, company]));
  return (
    <div className="interviews-form-add">
      <Input
        value={role}
        required
        isValid={isRoleValid}
        onChange={onInputChange('role')}
        message="Please enter Chars only"
      />
      <Input
        value={company}
        required
        isValid={isCompanyValid}
        onChange={onInputChange('company')}
        message="Please enter Chars only"
      />
      <Button
        text="Add Interview"
        disabled={isFormValid}
        onClick={onSubmit}
      />
    </div>
  );
};

InterviewsAddForm.propTypes = {
  values: object.isRequired,
  onInputChange: func.isRequired,
  onSubmit: func.isRequired,
};

export default InterviewsAddForm;
