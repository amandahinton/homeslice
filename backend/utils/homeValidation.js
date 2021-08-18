const { handleValidationErrors } = require('./validation');

const { check } = require('express-validator');

const street = check('street')
  .notEmpty()
  .withMessage('Street address must not be empty');

const city = check('city')
  .notEmpty()
  .withMessage('City must not be empty');

const state = check('state')
  .notEmpty()
  .withMessage('State must be two-letter state code');

const zipcode = check('zipcode')
  .notEmpty()
  .withMessage('Zipcode must not be empty');

const photoUrl = check('photoUrl')
  .notEmpty()
  .isURL()
  .withMessage('Link to image must be a valid URL');

const sqft = check('sqft')
  .notEmpty()
  .isInt({ min: 0 });

const beds = check('beds')
  .notEmpty()
  .isInt({ min: 0 });

const baths = check('baths')
  .notEmpty()
  .isInt({ min: 0 });

const yearBuilt = check('yearBuilt')
  .notEmpty()
  .isInt({ min: 0 });

exports.validateHomeCreate = [
  street,
  city,
  state,
  zipcode,
  photoUrl,
  sqft,
  beds,
  baths,
  yearBuilt,
  handleValidationErrors,
];

exports.validateHomeUpdate = [
  street,
  city,
  state,
  zipcode,
  photoUrl,
  sqft,
  beds,
  baths,
  yearBuilt,
  handleValidationErrors,
];
