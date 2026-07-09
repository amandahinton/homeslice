const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js');
const { validateHomeCreate, validateHomeUpdate } = require('../../utils/homeValidation.js');
const { validateBookingForm } = require('../../utils/bookingValidation.js');

const { Home, Booking } = require('../../db/models');

const notFoundError = (id) => {
  const error = new Error()
  error.title = 'Resource not found'
  error.message = "Can't find resource with the id provided"
  error.status = 404
  return error
};

// Returns the home only if it exists and belongs to the given user;
// a null result is surfaced as a 404 so home ids aren't leaked to non-owners.
const findOwnedHome = async (homeId, userId) => {
  const home = await Home.findByPk(homeId);
  if (!home || home.userId !== userId) return null;
  return home;
};

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const homes = await Home.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(homes);
}));

router.get('/:id', requireAuth, asyncHandler(async (req, res, next) => {
  const home = await findOwnedHome(req.params.id, req.user.id);
  if (!home) return next(notFoundError(req.params.id));
  res.json(home);
}));

router.post('/new', requireAuth, validateHomeCreate, asyncHandler(async (req, res) => {
  const {street, city, state, zipcode, photoUrl, sqft, beds, baths, yearBuilt} = req.body;
  const home = await Home.create({
    street, city, state, zipcode, photoUrl, sqft, beds, baths, yearBuilt,
    userId: req.user.id
  });
  res.status(201).json(home);
}));

router.put('/:id/edit', requireAuth, validateHomeUpdate, asyncHandler(async (req, res, next) => {
  const homeId = req.params.id
  const {street, city, state, zipcode, photoUrl, sqft, beds, baths, yearBuilt} = req.body;
  const home = await findOwnedHome(homeId, req.user.id);

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
    next(notFoundError(homeId))
  }
}));

router.delete("/:id", requireAuth, asyncHandler(async function (req, res, next) {
  const homeId = req.params.id;
  const home = await findOwnedHome(homeId, req.user.id);
  if (home) {
    await Booking.destroy( { where: { homeId: home.id }})
    await home.destroy();
    res.status(200).json(homeId);
  } else {
    next(notFoundError(homeId))
  }
}));

router.get('/:id/bookings', requireAuth, asyncHandler(async (req, res, next) => {
  const home = await findOwnedHome(req.params.id, req.user.id);
  if (!home) return next(notFoundError(req.params.id));

  const bookings = await Booking.findAll({
    where: {
      homeId: home.id
    },
    order: [['date', 'DESC']]
  });

  res.json(bookings);
}));

router.post('/:id/bookings/new', requireAuth, validateBookingForm, asyncHandler(async (req, res, next) => {
    const home = await findOwnedHome(req.params.id, req.user.id);
    if (!home) return next(notFoundError(req.params.id));

    const { date, title, description, intervalDays, eventId } = req.body;
    const booking = await Booking.create({
      date, title, description, intervalDays, eventId,
      homeId: home.id
    });
    res.status(201).json(booking);
}));

router.get('/:id/bookings/:bookingId', requireAuth, asyncHandler(async (req, res, next) => {
  const home = await findOwnedHome(req.params.id, req.user.id);
  const booking = home && await Booking.findByPk(req.params.bookingId);
  if (!booking || booking.homeId !== home.id) return next(notFoundError(req.params.bookingId));
  res.json(booking);
}));

router.put('/:id/bookings/:bookingId/edit', requireAuth, validateBookingForm, asyncHandler(async (req, res, next) => {
  const bookingId = parseInt(req.params.bookingId, 10)
  const { date, title, description, intervalDays, homeId, eventId } = req.body;

  const home = await findOwnedHome(req.params.id, req.user.id);
  const booking = home && await Booking.findByPk(bookingId);
  if (!booking || booking.homeId !== home.id) return next(notFoundError(bookingId));

  // A booking may be moved, but only to another home the user owns
  const targetHomeId = parseInt(homeId, 10);
  const targetHome = targetHomeId === home.id ? home : await findOwnedHome(targetHomeId, req.user.id);
  if (!targetHome) return next(notFoundError(targetHomeId));

  booking.date = date,
  booking.title = title,
  booking.description = description,
  booking.intervalDays = intervalDays,
  booking.homeId = targetHome.id,
  booking.eventId = eventId
  await booking.save()
  res.status(200).json(booking);
}));

router.delete("/:id/bookings/:bookingId", requireAuth, asyncHandler(async function (req, res, next) {
  const bookingId = req.params.bookingId;
  const home = await findOwnedHome(req.params.id, req.user.id);
  const booking = home && await Booking.findByPk(bookingId);
  if (!booking || booking.homeId !== home.id) return next(notFoundError(bookingId));

  await booking.destroy();
  res.status(200).json(bookingId);
}));


module.exports = router;
