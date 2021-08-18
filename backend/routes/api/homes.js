const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js');


const { Home } = require('../../db/models');

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const homes = await Home.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(homes);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const home = await Home.findByPk(req.params.id);
  res.json(home);
}));

module.exports = router;
