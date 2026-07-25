const Note = require('../models/Note.model');
const Activity = require('../models/Activity.model');
const { ErrorResponse } = require('../utils/errorResponse');

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ leadId: req.params.leadId })
      .populate('userId', 'name avatar')
      .sort('-createdAt');
      
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    next(err);
  }
};

exports.addNote = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const note = await Note.create(req.body);

    // Log Activity
    await Activity.create({
      leadId: req.body.leadId,
      userId: req.user.id,
      action: 'Note Added',
      description: 'Added a new note to the lead'
    });

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};
