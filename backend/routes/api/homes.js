const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Home } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
  const homes = await Home.findAll();
  res.json(homes);
}));




module.exports = router;
