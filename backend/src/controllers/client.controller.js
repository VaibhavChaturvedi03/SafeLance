import Client from '../models/client.model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validationResult } from 'express-validator';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, userType: 'client' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Send token response
const createSendToken = (client, statusCode, res) => {
  const token = generateToken(client._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  client.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      client
    }
  });
};

// @desc    Register new client
// @route   POST /api/clients/register
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
      companyName,
      companySize,
      industry,
      projectTypes,
      typicalBudgetRange
    } = req.body;

    // Check if client already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({
        status: 'error',
        message: 'Client with this email already exists'
      });
    }

    // Create new client
    const client = await Client.create({
      firstName,
      lastName,
      email,
      password,
      companyName,
      companySize,
      industry,
      projectTypes,
      typicalBudgetRange
    });

    // Generate verification token
    const verificationToken = client.generateVerificationToken();
    await client.save({ validateBeforeSave: false });

    // TODO: Send verification email
    // await sendVerificationEmail(client.email, verificationToken);

    createSendToken(client, 201, res);
  } catch (error) {
    console.error('Client registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating client account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login client
// @route   POST /api/clients/login
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

    // Check if client exists and password is correct
    const client = await Client.findOne({ email }).select('+password');
    
    if (!client || !(await client.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Check if account is locked
    if (client.accountLocked) {
      return res.status(423).json({
        status: 'error',
        message: 'Account is locked. Please contact support.'
      });
    }

    // Reset login attempts and update last login
    client.loginAttempts = 0;
    client.lastLogin = new Date();
    await client.save({ validateBeforeSave: false });

    createSendToken(client, 200, res);
  } catch (error) {
    console.error('Client login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error logging in',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get client profile
// @route   GET /api/clients/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id)
      .populate('postedJobs')
      .populate('hiredFreelancers.freelancer')
      .populate('reviewsGiven');

    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        client
      }
    });
  } catch (error) {
    console.error('Get client profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update client profile
// @route   PUT /api/clients/profile
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
      'firstName', 'lastName', 'companyName', 'companySize', 
      'industry', 'projectTypes', 'typicalBudgetRange', 'profileImage'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const client = await Client.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        client
      }
    });
  } catch (error) {
    console.error('Update client profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Change password
// @route   PUT /api/clients/change-password
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

    const client = await Client.findById(req.user.id).select('+password');

    if (!(await client.comparePassword(currentPassword))) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    client.password = newPassword;
    await client.save();

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

// @desc    Delete client account
// @route   DELETE /api/clients/account
// @access  Private
export const deleteAccount = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);

    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found'
      });
    }

    // Soft delete - mark as inactive
    client.isActive = false;
    await client.save();

    res.status(200).json({
      status: 'success',
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete client account error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Logout client
// @route   POST /api/clients/logout
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
