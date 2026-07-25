const express = require('express');
const { getActivities } = require('../controllers/activity.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.route('/:leadId')
  .get(getActivities);

module.exports = router;
