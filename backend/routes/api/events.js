const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, User, Venue } = require('../../db/models');

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
    const events = await Event.findAll({
      include: [User, Venue]
    });
    return res.json({ events });
  })
);

router.post(
  '/',
  validateEvent,
  asyncHandler(async (req, res, next) => {
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

router.put(
  '/:eventId',
  validateEvent,
  asyncHandler(async (req, res, next) => {
    const eventId = req.params.eventId;
    const {
      name,
      description,
      date,
      capacity,
      inPerson
    } = req.body;
    const changes = {
      name,
      description,
      date,
      capacity,
      inPerson
    };
    if (req.body.venueId === null) changes.venueId = null;
    const editedEvent = await Event.update(
      changes,
      {
        where: { id: eventId }
      }
    );
    return res.json({ editedEvent });
  })
)

module.exports = router;
