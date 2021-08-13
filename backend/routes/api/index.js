const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
// All URLs of routes in api router prefixed with /api

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

const asyncHandler = require('express-async-handler'); // GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body });
// });

router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Guest'
    },
  })
  setTokenCookie(res, user);
  return res.json({ user });
}));

router.get(     // GET /api/restore-user
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(     // GET /api/require-auth
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
