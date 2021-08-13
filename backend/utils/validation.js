const { validationResult } = require('express-validator');      // validate on routes that expect request body

// middleware for formatting errors from express-validator
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req); // results of check, determines body is valid

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
