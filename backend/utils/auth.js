const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


const setTokenCookie = (res, user) => {     // used by login and signup routes
  const token = jwt.sign(      // create new token with user and secret
    { data: user.toSafeObject() },      // from user model
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {      // save token in cookie
    maxAge: expiresIn * 1000,      // milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

const restoreUser = (req, res, next) => {     // identify session user for authenticated routes
  const { token } = req.cookies;      // token parsed from cookies

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {     // verify token
    if (err) return next();

    try {
      const { id } = jwtPayload.data;     // parse and verify jwt
      req.user = await User.scope('currentUser').findByPk(id);     // currentUser scope since hashedPassword not needed
    } catch (e) {
      res.clearCookie('token');     // clear cookie if jwt error or no user found
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};      // add as pre-middleware for route handlers and requireAuth middleware

const requireAuth = [     // error if no current user
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);     // send to error-handling middleware
  },
];      // add as pre-middleware for route handlers

module.exports = { setTokenCookie, restoreUser, requireAuth };
