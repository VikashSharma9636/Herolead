const Lead = require('../models/Lead.model');
const Activity = require('../models/Activity.model');
const { ErrorResponse } = require('../utils/errorResponse');

exports.getLeads = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from normal matching
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Lead.find(JSON.parse(queryStr));

    // Search functionality
    if (req.query.search) {
      query = query.find({
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
          { company: { $regex: req.query.search, $options: 'i' } }
        ]
      });
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Lead.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Populate assigned to
    query = query.populate({
      path: 'assignedTo',
      select: 'name email role'
    });

    const leads = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({ success: true, count: leads.length, pagination, data: leads });
  } catch (err) {
    next(err);
  }
};

exports.getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate({
      path: 'assignedTo',
      select: 'name email role'
    });
    
    if (!lead) {
      return next(new ErrorResponse(`Lead not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.createLead = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const lead = await Lead.create(req.body);
    
    // Log Activity
    await Activity.create({
      leadId: lead._id,
      userId: req.user.id,
      action: 'Created',
      description: `Lead created by ${req.user.name}`
    });

    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    let lead = await Lead.findById(req.params.id);
    if (!lead) {
      return next(new ErrorResponse(`Lead not found with id of ${req.params.id}`, 404));
    }

    const previousStatus = lead.status;
    const previousAssignee = lead.assignedTo;

    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Log status change
    if (req.body.status && req.body.status !== previousStatus) {
      await Activity.create({
        leadId: lead._id,
        userId: req.user.id,
        action: 'Status Updated',
        description: `Status changed from ${previousStatus} to ${req.body.status}`
      });
    }

    // Log assignment change
    if (req.body.assignedTo && String(req.body.assignedTo) !== String(previousAssignee)) {
      await Activity.create({
        leadId: lead._id,
        userId: req.user.id,
        action: 'Assigned',
        description: `Lead assigned to a new user`
      });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return next(new ErrorResponse(`Lead not found with id of ${req.params.id}`, 404));
    }
    
    // Cleanup activities and notes for this lead
    await Activity.deleteMany({ leadId: req.params.id });
    const Note = require('../models/Note.model');
    await Note.deleteMany({ leadId: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
