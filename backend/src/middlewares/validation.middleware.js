import { body, param, query } from 'express-validator';

// Client validation rules
export const validateClientRegister = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  body('companySize')
    .optional()
    .isIn(['1-10', '11-50', '51-200', '200+'])
    .withMessage('Invalid company size'),
  
  body('industry')
    .optional()
    .isIn(['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'Other'])
    .withMessage('Invalid industry')
];

export const validateClientUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be less than 50 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  
  body('companyName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters')
];

// Freelancer validation rules
export const validateFreelancerRegister = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Professional title is required and must be less than 100 characters'),
  
  body('skills')
    .isArray({ min: 1, max: 10 })
    .withMessage('Please select 1-10 skills'),
  
  body('experience')
    .isIn(['Entry Level', 'Intermediate', 'Expert'])
    .withMessage('Invalid experience level'),
  
  body('hourlyRate')
    .isFloat({ min: 1, max: 1000 })
    .withMessage('Hourly rate must be between $1 and $1000'),
  
  body('bio')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Bio must be between 50 and 1000 characters'),
  
  body('portfolio')
    .optional()
    .isURL()
    .withMessage('Portfolio must be a valid URL')
];

export const validateFreelancerUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Professional title must be less than 100 characters'),
  
  body('skills')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Maximum 10 skills allowed'),
  
  body('hourlyRate')
    .optional()
    .isFloat({ min: 1, max: 1000 })
    .withMessage('Hourly rate must be between $1 and $1000'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Bio must be between 50 and 1000 characters')
];

// Login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Password change validation
export const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];
