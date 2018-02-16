import FormValidator from './FormValidator';

describe('Shared Helpers: FormValidator', () => {
  describe('FormValidator', () => {
    it('validateEmail() should return true when value is a valid email', () => {
      const email = 'me@test.com';
      const validator = new FormValidator();
      const validation = validator.validateEmail(email);

      expect(validation).toBeTruthy();
    });

    it('validateChars() should return true when value consist of only characters', () => {
      const chars = 'Hello World';
      const validator = new FormValidator();
      const validation = validator.validateChars(chars);

      expect(validation).toBeTruthy();
    });

    it('validateDigits() should return true when value consist of only numbers', () => {
      const digits = '123 4567';
      const validator = new FormValidator();
      const validation = validator.validateDigits(digits);

      expect(validation).toBeTruthy();
    });

   it('existValues() should return true when all values are longer then 0', () => {
      const values = ['value', 'value2'];
      const validator = new FormValidator();
      const validation = validator.existValues(values);

      expect(validation).toBeTruthy();
    });

   it('existValues() should return false when not all values are longer then 0', () => {
      const values = ['value', ''];
      const validator = new FormValidator();
      const validation = validator.existValues(values);

      expect(validation).toBeFalsy();
    });

    it('validate() should return true when all values are valid and have an array of 3 pattern lengths', () => {
      const email = 'me@test.com';
      const chars = 'Hello World';
      const digits = '123 4567';
      const validator = new FormValidator();

      validator.validateEmail(email);
      validator.validateChars(chars);
      validator.validateDigits(digits);

      expect(validator.patterns).toHaveLength(3);
      expect(validator.validate()).toBeTruthy();
    });

    it('validate() should return false when not all values are valid and have an array of 3 pattern lengths', () => {
      const email = 'me@test.com';
      const chars = 'Hello World 123';
      const digits = '123 4567';
      const validator = new FormValidator();

      validator.validateEmail(email);
      validator.validateChars(chars);
      validator.validateDigits(digits);

      expect(validator.patterns).toHaveLength(3);
      expect(validator.validate()).toBeFalsy();
    });
  });
});
