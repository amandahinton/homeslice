const express = require('express');
const asyncHandler = require('express-async-handler'); // wrap asynchronous route handlers and middlewares

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');     // validate body of request
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')     // expect req body to have credential key with username or email
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')     // expect req body to have password key with matching password
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

router.post(      // log in
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {      // if no user, pass through error handlers
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Provided credentials were invalid'];
      return next(err);
    }

    await setTokenCookie(res, user);      // if user, save token as cookie

    return res.json({      // if user, return user info
      user,
    });
  }),
);

router.delete(      // log out
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get(      // restore session user
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({      // return session user object JSON with key of user
        user: user.toSafeObject()
      });
    } else return res.json({});      // if no session, return empty object JSON
  }
);

module.exports = router;
