const Activity = require('../models/Activity.model');

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({ leadId: req.params.leadId })
      .populate('userId', 'name role avatar')
      .sort('-createdAt');
      
    res.status(200).json({ success: true, count: activities.length, data: activities });
  } catch (err) {
    next(err);
  }
};
