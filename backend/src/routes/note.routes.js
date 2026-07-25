const express = require('express');
const { getNotes, addNote } = require('../controllers/note.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(addNote);

router.route('/:leadId')
  .get(getNotes);

module.exports = router;
