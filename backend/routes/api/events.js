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
]

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const events = await Event.findAll();
    return res.json({ events });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {

  })
)

module.exports = router;
