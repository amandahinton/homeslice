const { handleValidationErrors } = require('./validation');

const { check } = require('express-validator');

const date = check('date')
  .notEmpty()
  .isDate()
  .withMessage('Date must have format YYYY/MM/DD');

const title = check('title')
  .notEmpty()
  .withMessage('Title must not be empty');

const intervalDays = check('intervalDays')
  .notEmpty()
  .isInt({ min: 0 });

exports.validateBookingForm = [
  date,
  title,
  intervalDays,
  handleValidationErrors,
];
