import express from 'express';
import clientRoutes from './client.routes.js';
import freelancerRoutes from './freelancer.routes.js';

const router = express.Router();

// Mount routes
router.use('/clients', clientRoutes);
router.use('/freelancers', freelancerRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
