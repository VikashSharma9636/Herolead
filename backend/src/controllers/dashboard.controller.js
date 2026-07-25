const Lead = require('../models/Lead.model');
const Activity = require('../models/Activity.model');

exports.getDashboardData = async (req, res, next) => {
  try {
    // 1. Get Stats
    const totalLeads = await Lead.countDocuments();
    
    const activeLeads = await Lead.countDocuments({
      status: { $in: ['New', 'Contacted', 'Qualified', 'Proposal Sent'] }
    });
    
    const wonDeals = await Lead.countDocuments({ status: 'Won' });
    
    // Calculate Revenue
    const wonLeads = await Lead.find({ status: 'Won' });
    const revenue = wonLeads.reduce((acc, lead) => acc + (lead.value || 0), 0);

    const stats = {
      totalLeads,
      activeLeads,
      wonDeals,
      revenue
    };

    // 2. Get Recent Leads (limit 5)
    const recentLeads = await Lead.find()
      .sort('-createdAt')
      .limit(5);

    // 3. Get Recent Activities (limit 5)
    const recentActivities = await Activity.find()
      .populate('userId', 'name role avatar')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats,
        recentLeads,
        recentActivities
      }
    });
  } catch (err) {
    next(err);
  }
};
