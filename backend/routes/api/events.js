const express = require('express');
const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Event } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  res.json(event);
}));


module.exports = router;
