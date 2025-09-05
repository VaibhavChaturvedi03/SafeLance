import mongoose from "mongoose";
import bcrypt from "bcrypt";

const clientSchema = new mongoose.Schema({
  // Basic Information (Step 2)
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxLength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  
  // User Type
  userType: {
    type: String,
    default: 'client',
    enum: ['client']
  },

  // Company Information (Step 2 - Client specific)
  companyName: {
    type: String,
    trim: true,
    maxLength: [100, 'Company name cannot exceed 100 characters']
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '200+', ''],
    default: ''
  },
  industry: {
    type: String,
    enum: ['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Other', ''],
    default: ''
  },

  // Project Preferences (Step 3)
  projectTypes: [{
    type: String,
    enum: ['Web Development', 'Mobile Apps', 'Design', 'Content Writing', 'Marketing', 'Other']
  }],
  typicalBudgetRange: {
    type: String,
    enum: ['Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+', ''],
    default: ''
  },

  // Profile Information
  profileImage: {
    type: String, // URL to profile image
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  
  // Activity Tracking
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // Posted Jobs
  postedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],

  // Hired Freelancers
  hiredFreelancers: [{
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Freelancer'
    },
    hiredAt: {
      type: Date,
      default: Date.now
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  }],

  // Reviews given to freelancers
  reviewsGiven: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],

  // Account Settings
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    marketing: {
      type: Boolean,
      default: false
    }
  },

  // Security
  passwordResetToken: String,
  passwordResetExpires: Date,
  accountLocked: {
    type: Boolean,
    default: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
clientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Index for better query performance
clientSchema.index({ email: 1 });
clientSchema.index({ companyName: 1 });
clientSchema.index({ industry: 1 });
clientSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
clientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
clientSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate verification token
clientSchema.methods.generateVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = token;
  return token;
};

const Client = mongoose.model("Client", clientSchema);

export default Client;