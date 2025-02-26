const {isString, isNil, isBoolean} = require('lodash');
const getError = require('./get-error');

const isNonEmptyString = (value) => isString(value) && value.trim();
const isCorrectPackageManager = (value) => ['npm', 'yarn', 'pnpm'].includes(value);

const VALIDATORS = {
  npmPublish: isBoolean,
  tarballDir: isNonEmptyString,
  pkgRoot: isNonEmptyString,
  packageManager: isCorrectPackageManager,
};

module.exports = ({npmPublish, tarballDir, pkgRoot}) => {
  const errors = Object.entries({npmPublish, tarballDir, pkgRoot}).reduce(
    (errors, [option, value]) =>
      !isNil(value) && !VALIDATORS[option](value)
        ? [...errors, getError(`EINVALID${option.toUpperCase()}`, {[option]: value})]
        : errors,
    []
  );

  return errors;
};
