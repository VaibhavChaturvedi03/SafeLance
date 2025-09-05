import Freelancer from '../models/freelancer.model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validationResult } from 'express-validator';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, userType: 'freelancer' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Send token response
const createSendToken = (freelancer, statusCode, res) => {
  const token = generateToken(freelancer._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  freelancer.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      freelancer
    }
  });
};

// @desc    Register new freelancer
// @route   POST /api/freelancers/register
// @access  Public
export const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      title,
      skills,
      experience,
      hourlyRate,
      bio,
      portfolio,
      education,
      certifications
    } = req.body;

    // Check if freelancer already exists
    const existingFreelancer = await Freelancer.findOne({ email });
    if (existingFreelancer) {
      return res.status(400).json({
        status: 'error',
        message: 'Freelancer with this email already exists'
      });
    }

    // Create new freelancer
    const freelancer = await Freelancer.create({
      firstName,
      lastName,
      email,
      password,
      title,
      skills,
      experience,
      hourlyRate,
      bio,
      portfolio,
      education,
      certifications
    });

    // Generate verification token
    const verificationToken = freelancer.generateVerificationToken();
    await freelancer.save({ validateBeforeSave: false });

    // TODO: Send verification email
    // await sendVerificationEmail(freelancer.email, verificationToken);

    createSendToken(freelancer, 201, res);
  } catch (error) {
    console.error('Freelancer registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating freelancer account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login freelancer
// @route   POST /api/freelancers/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Check if freelancer exists and password is correct
    const freelancer = await Freelancer.findOne({ email }).select('+password');
    
    if (!freelancer || !(await freelancer.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Check if account is locked
    if (freelancer.accountLocked) {
      return res.status(423).json({
        status: 'error',
        message: 'Account is locked. Please contact support.'
      });
    }

    // Reset login attempts and update last login
    freelancer.loginAttempts = 0;
    freelancer.lastLogin = new Date();
    await freelancer.save({ validateBeforeSave: false });

    createSendToken(freelancer, 200, res);
  } catch (error) {
    console.error('Freelancer login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error logging in',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get freelancer profile
// @route   GET /api/freelancers/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.user.id)
      .populate('appliedJobs.job')
      .populate('currentProjects')
      .populate('reviewsReceived');

    if (!freelancer) {
      return res.status(404).json({
        status: 'error',
        message: 'Freelancer not found'
      });
    }

    // Increment profile views if viewed by someone else
    if (req.query.increment && req.user.id !== freelancer._id.toString()) {
      freelancer.profileViews += 1;
      await freelancer.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      status: 'success',
      data: {
        freelancer
      }
    });
  } catch (error) {
    console.error('Get freelancer profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update freelancer profile
// @route   PUT /api/freelancers/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const allowedFields = [
      'firstName', 'lastName', 'title', 'skills', 'experience',
      'hourlyRate', 'bio', 'portfolio', 'education', 'certifications',
      'availability', 'profileImage'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const freelancer = await Freelancer.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!freelancer) {
      return res.status(404).json({
        status: 'error',
        message: 'Freelancer not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        freelancer
      }
    });
  } catch (error) {
    console.error('Update freelancer profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all freelancers with filters
// @route   GET /api/freelancers
// @access  Public
export const getAllFreelancers = async (req, res) => {
  try {
    // Build filter object
    const filter = { isActive: true };
    
    if (req.query.skills) {
      const skills = req.query.skills.split(',');
      filter.skills = { $in: skills };
    }
    
    if (req.query.experience) {
      filter.experience = req.query.experience;
    }
    
    if (req.query.minRate || req.query.maxRate) {
      filter.hourlyRate = {};
      if (req.query.minRate) filter.hourlyRate.$gte = Number(req.query.minRate);
      if (req.query.maxRate) filter.hourlyRate.$lte = Number(req.query.maxRate);
    }
    
    if (req.query.availability) {
      filter.availability = req.query.availability;
    }

    // Build sort object
    let sort = {};
    if (req.query.sortBy) {
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
      sort[sortBy] = sortOrder;
    } else {
      sort = { averageRating: -1, createdAt: -1 }; // Default sort
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const freelancers = await Freelancer.find(filter)
      .select('-password -verificationToken -passwordResetToken')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('reviewsReceived', 'rating comment client createdAt');

    const total = await Freelancer.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      results: freelancers.length,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total
      },
      data: {
        freelancers
      }
    });
  } catch (error) {
    console.error('Get freelancers error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching freelancers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Apply to a job
// @route   POST /api/freelancers/apply/:jobId
// @access  Private
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { proposal, proposedRate } = req.body;

    const freelancer = await Freelancer.findById(req.user.id);

    if (!freelancer) {
      return res.status(404).json({
        status: 'error',
        message: 'Freelancer not found'
      });
    }

    // Check if already applied
    const existingApplication = freelancer.appliedJobs.find(
      app => app.job.toString() === jobId
    );

    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already applied to this job'
      });
    }

    // Add application
    freelancer.appliedJobs.push({
      job: jobId,
      proposal,
      proposedRate: proposedRate || freelancer.hourlyRate,
      appliedAt: new Date()
    });

    await freelancer.save();

    res.status(200).json({
      status: 'success',
      message: 'Job application submitted successfully'
    });
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error applying to job',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Change password
// @route   PUT /api/freelancers/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide current and new passwords'
      });
    }

    const freelancer = await Freelancer.findById(req.user.id).select('+password');

    if (!(await freelancer.comparePassword(currentPassword))) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    freelancer.password = newPassword;
    await freelancer.save();

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error changing password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete freelancer account
// @route   DELETE /api/freelancers/account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.user.id);

    if (!freelancer) {
      return res.status(404).json({
        status: 'error',
        message: 'Freelancer not found'
      });
    }

    // Soft delete - mark as inactive
    freelancer.isActive = false;
    await freelancer.save();

    res.status(200).json({
      status: 'success',
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete freelancer account error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Logout freelancer
// @route   POST /api/freelancers/logout
// @access  Private
export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};
