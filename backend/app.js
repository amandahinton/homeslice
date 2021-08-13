const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const { ValidationError } = require('sequelize');

const { environment } = require('./config');      // check env key in configuration file
const isProduction = environment === 'production';      // true if prod environment

const app = express();      // set up express application

app.use(morgan('dev'));     // log info about server requests/responses
app.use(cookieParser());    // parse cookies from requests
app.use(express.json());

if (!isProduction) {
  app.use(cors());      // enable cors in development env
}

app.use(helmet({      // middleware set headers for security
  contentSecurityPolicy: false
}));

app.use(
  csurf({      // set _csrf token and create req.csrfToken method
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);      // connect all routes

///// error-handling middlewares /////
app.use((_req, _res, next) => {     // catch unhandled requests and forward to error handler
  const err = new Error("The requested resource could not be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource could not be found."];
  err.status = 404;
  next(err);      // error handlers defined next / after this will be invoked
});

app.use((err, _req, _res, next) => {      // check for Sequelize database error
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);      // add title and errors array to error
});

app.use((err, _req, res, _next) => {      // format errors and return JSON response
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,     // error message
    errors: err.errors,     // errors array
    stack: isProduction ? null : err.stack,     // error stack trace
  });
});

module.exports = app;
