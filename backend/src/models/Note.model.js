const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lead',
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  note: {
    type: String,
    required: [true, 'Please add a note']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
