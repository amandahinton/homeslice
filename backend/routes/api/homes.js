const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js');
const { validateHomeCreate, validateHomeUpdate } = require('../../utils/homeValidation.js');
const { validateBookingForm } = require('../../utils/bookingValidation.js');

const { Home, Booking } = require('../../db/models');

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

router.post('/new', validateHomeCreate, asyncHandler(async (req, res) => {
  const home = await Home.create(req.body);
  res.status(201).json(home);
}));

const homeNotFoundError = (homeId) => {
  const error = new Error()
  error.title = 'Home not found'
  error.message = "Can't find home with the id provided"
  error.status = 404
  return error
};

router.put('/:id/edit', validateHomeUpdate, asyncHandler(async (req, res) => {
  const homeId = req.params.id
  const {street, city, state, zipcode, photoUrl, sqft, beds, baths, yearBuilt} = req.body;
  const home = await Home.findByPk(homeId)

  if (home) {
    home.street=street;
    home.city=city;
    home.state=state;
    home.zipcode=zipcode;
    home.photoUrl=photoUrl;
    home.sqft=sqft;
    home.beds=beds;
    home.baths=baths;
    home.yearBuilt=yearBuilt;
    await home.save()
    res.status(200).json(home);
  } else {
    next(homeNotFoundError(homeId))
  }
}));

router.delete("/:id", asyncHandler(async function (req, res) {
  const homeId = req.params.id;
  if (homeId) {
    await Home.destroy({ where: { id: homeId } });
    res.status(200).json(homeId);
  } else {
    next(homeNotFoundError(homeId))
  }
}));

router.get('/:id/bookings', asyncHandler(async (req, res) => {
  const thisHomeId = parseInt(req.params.id, 10)

  const home = await Home.findByPk(thisHomeId);

  const bookings = await Booking.findAll({
    where: {
      homeId: thisHomeId
    },
    order: [['date', 'DESC']]
  });

  res.json(bookings);
}));

router.post('/:id/bookings/new', validateBookingForm, asyncHandler(async (req, res) => {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
}));

module.exports = router;
