const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event } = require('../../db/models');

const router = express.Router();

const validateEvent = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for your event.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description/details.'),
  check('date')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid date and time')
    .isISO8601()
    .withMessage('Please provide a valid date and time.'),
  check('capacity')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an RSVP capacity.')
    .custom(value => value >= 1)
    .withMessage('RSVP capacity must be greater than or equal to 1.'),
  handleValidationErrors
];

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const events = await Event.findAll();
    return res.json({ events });
  })
);

router.post(
  '/',
  validateEvent,
  asyncHandler(async (req, res, next) => {
    console.log('MADE IT PAST VALIDATIONS')
    const {
      hostId,
      groupId,
      name,
      description,
      date,
      capacity,
      inPerson
    } = req.body;
    const event = Event.create({
      hostId,
      groupId,
      name,
      description,
      date,
      capacity,
      inPerson
    });
    return res.json({ event });
  })
);

module.exports = router;
