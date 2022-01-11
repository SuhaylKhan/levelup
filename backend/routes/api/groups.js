const express = require('express');
const asyncHandler = require('express-async-handler');
const { Group } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const groups = await Group.findAll();

    return res.json({ groups });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const groupId = req.params.id;
    const group = await Group.findByPK(groupId);

    return res.json({ group });
  })
);

module.exports = router;
