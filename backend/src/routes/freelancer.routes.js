import express from 'express';
import * as freelancerController from '../controllers/freelancer.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import {
  validateFreelancerRegister,
  validateFreelancerUpdate,
  validateLogin,
  validatePasswordChange
} from '../middlewares/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', freelancerController.getAllFreelancers); // Browse freelancers
router.post('/register', validateFreelancerRegister, freelancerController.register);
router.post('/login', validateLogin, freelancerController.login);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware are protected

// Routes accessible by all authenticated users
router.get('/profile/:id', freelancerController.getProfile); // Get profile (own or others)

// Routes only for freelancers
router.use(restrictTo('freelancer')); // Only freelancers can access these routes

router.put('/profile', validateFreelancerUpdate, freelancerController.updateProfile);
router.put('/change-password', validatePasswordChange, freelancerController.changePassword);
router.post('/apply/:jobId', freelancerController.applyToJob);
router.delete('/account', freelancerController.deleteAccount);
router.post('/logout', freelancerController.logout);

export default router;
