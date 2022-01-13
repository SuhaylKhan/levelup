const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Event } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('fullName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your name.'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

router.get(
  '/:userId/groups',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const memberGroups = await User.findByPk(userId, {
      include: Group
    });
    const adminGroups = await Group.findAll({
      where: { adminId: userId }
    })

    return res.json({
      memberGroups,
      adminGroups
    })
  })
)

router.get(
  '/:userId/events',
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      include: {
        model: Group,
        include: {
          model: Event
        }
      }
    })
    const hostedEvents = await Event.findAll({
      where: {
        hostId: userId
      }
    });
    const userGroups = user.Groups

    return res.json({
      hostedEvents,
      userGroups
    })
  })
)

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { fullName, email, password, username } = req.body;
    const user = await User.signup({ fullName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

module.exports = router;
