const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const homesRouter = require('./homes.js');

// All URLs of routes in api router prefixed with /api
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/homes', homesRouter);

module.exports = router;
