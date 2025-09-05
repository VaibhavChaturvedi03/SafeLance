import mongoose from "mongoose";
import bcrypt from "bcrypt";

const freelancerSchema = new mongoose.Schema({
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
    select: false
  },

  // User Type
  userType: {
    type: String,
    default: 'freelancer',
    enum: ['freelancer']
  },

  // Professional Information (Step 3)
  title: {
    type: String,
    required: [true, 'Professional title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  skills: [{
    type: String,
    enum: [
      'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'C++',
      'UI/UX Design', 'Graphic Design', 'Figma', 'Adobe Creative Suite',
      'Content Writing', 'SEO', 'Digital Marketing', 'Social Media',
      'Video Editing', 'Photography', '3D Modeling', 'Animation'
    ],
    validate: {
      validator: function(skills) {
        return skills.length <= 10;
      },
      message: 'Cannot have more than 10 skills'
    }
  }],
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['Entry Level', 'Intermediate', 'Expert']
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: [1, 'Hourly rate must be at least $1'],
    max: [1000, 'Hourly rate cannot exceed $1000']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxLength: [1000, 'Bio cannot exceed 1000 characters'],
    minLength: [50, 'Bio must be at least 50 characters']
  },
  portfolio: {
    type: String,
    trim: true,
    validate: {
      validator: function(url) {
        if (!url) return true; // Optional field
        return /^https?:\/\/.+/.test(url);
      },
      message: 'Portfolio must be a valid URL'
    }
  },

  // Additional Professional Info (can be added later)
  education: {
    type: String,
    trim: true,
    maxLength: [500, 'Education cannot exceed 500 characters']
  },
  certifications: [{
    name: {
      type: String,
      trim: true,
      maxLength: [100, 'Certification name cannot exceed 100 characters']
    },
    issuer: {
      type: String,
      trim: true,
      maxLength: [100, 'Issuer name cannot exceed 100 characters']
    },
    dateIssued: Date,
    expiryDate: Date,
    credentialId: String,
    credentialUrl: String
  }],

  // Profile Information
  profileImage: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Not Available'],
    default: 'Available'
  },
  
  // Work History & Statistics
  completedJobs: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },

  // Job Applications & History
  appliedJobs: [{
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending'
    },
    proposal: String,
    proposedRate: Number
  }],

  currentProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],

  // Reviews received from clients
  reviewsReceived: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],

  // Verification & Trust
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  identityVerified: {
    type: Boolean,
    default: false
  },
  paymentVerified: {
    type: Boolean,
    default: false
  },

  // Activity Tracking
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileViews: {
    type: Number,
    default: 0
  },

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
    jobAlerts: {
      type: Boolean,
      default: true
    }
  },

  // Payment Information
  paymentMethods: [{
    type: {
      type: String,
      enum: ['paypal', 'stripe', 'bank_transfer']
    },
    details: mongoose.Schema.Types.Mixed,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],

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
freelancerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for experience level numeric value (for sorting)
freelancerSchema.virtual('experienceLevel').get(function() {
  const levels = { 'Entry Level': 1, 'Intermediate': 2, 'Expert': 3 };
  return levels[this.experience] || 0;
});

// Indexes for better query performance
freelancerSchema.index({ email: 1 });
freelancerSchema.index({ skills: 1 });
freelancerSchema.index({ hourlyRate: 1 });
freelancerSchema.index({ averageRating: -1 });
freelancerSchema.index({ experience: 1 });
freelancerSchema.index({ availability: 1 });
freelancerSchema.index({ createdAt: -1 });

// Compound indexes
freelancerSchema.index({ skills: 1, hourlyRate: 1 });
freelancerSchema.index({ skills: 1, averageRating: -1 });

// Pre-save middleware to hash password
freelancerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
freelancerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to calculate average rating
freelancerSchema.methods.calculateAverageRating = async function() {
  const Review = mongoose.model('Review');
  const stats = await Review.aggregate([
    { $match: { freelancer: this._id } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].avgRating * 10) / 10;
    this.totalReviews = stats[0].totalReviews;
  } else {
    this.averageRating = 0;
    this.totalReviews = 0;
  }

  await this.save();
};

// Method to generate verification token
freelancerSchema.methods.generateVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = token;
  return token;
};

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;
