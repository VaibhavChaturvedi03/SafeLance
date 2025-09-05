import express from 'express';
import * as clientController from '../controllers/client.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import {
  validateClientRegister,
  validateClientUpdate,
  validateLogin,
  validatePasswordChange
} from '../middlewares/validation.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', validateClientRegister, clientController.register);
router.post('/login', validateLogin, clientController.login);

// Protected routes (require authentication)
router.use(protect); // All routes after this middleware are protected
router.use(restrictTo('client')); // Only clients can access these routes

router.get('/profile', clientController.getProfile);
router.put('/profile', validateClientUpdate, clientController.updateProfile);
router.put('/change-password', validatePasswordChange, clientController.changePassword);
router.delete('/account', clientController.deleteAccount);
router.post('/logout', clientController.logout);

export default router;
