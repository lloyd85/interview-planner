import { PATTERNS_REGEX } from '../constants';

const { PATTERN_EMAIL, PATTERN_CHARS, PATTERN_DIGITS } = PATTERNS_REGEX;

export default class FormValidator {
  constructor() {
    this.patterns = [];
    this.values = [];
  }

  validateEmail(value) {
    const isEmail = PATTERN_EMAIL.test(value);
    this.patterns.push(isEmail);

    return isEmail;
  }

  validateChars(value) {
    const isChars = PATTERN_CHARS.test(value);

    this.patterns.push(isChars);

    return isChars;
  }

  validateDigits(value) {
    const isDigits = PATTERN_DIGITS.test(value);
    this.patterns.push(isDigits);
    return isDigits;
  }

  existValues(values) {
    this.values = values.every(value => value.length > 0);
    return this.values;
  }

  validate() {
    return this.patterns.every(pattern => pattern === true);
  }
}
