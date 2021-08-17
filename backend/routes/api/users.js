const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [      // validate req body keys:values for email, username, password
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Provide a valid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Provide a username with at least 4 characters'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Provide a first name between 1 and 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Provide a last name between 1 and 50 characters long'),
  check('phone')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Provide a phone number between 1 and 20 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Provide a username with at least 6 characters'),
  handleValidationErrors,
];

router.post(      // sign up
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, phone, password } = req.body;
    const user = await User.signup({ username, firstName, lastName, email, phone, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

module.exports = router;
