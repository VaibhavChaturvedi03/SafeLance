import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

// Import routes
import clientRoutes from './routes/client.routes.js';
import freelancerRoutes from './routes/freelancer.routes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // In development, allow localhost origins
        if (process.env.NODE_ENV !== 'production') {
            const allowedOrigins = [
                'http://localhost:5173',
                'http://127.0.0.1:5173',
            ];
            
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
        }
        
        // In production, use the CORS_ORIGIN from env
        if (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== '*') {
            const allowedOrigins = process.env.CORS_ORIGIN.split(',').map(origin => origin.trim());
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
        }
        
        // If CORS_ORIGIN is *, allow all origins (not recommended for production)
        if (process.env.CORS_ORIGIN === '*') {
            return callback(null, true);
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin',
        'X-User-ID',
        'X-User-Email', 
        'X-User-Name'
    ],
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log(`   Origin: ${req.headers.origin || 'none'}`);
    console.log(`   Auth: ${req.headers.authorization ? 'present' : 'none'}`);
    console.log(`   User-Agent: ${req.headers['user-agent'] || 'none'}`);
    next();
});

// Routes - ORDER MATTERS!
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Safelance Backend is running!',
        service: 'Freelancing Platform API',
        cors: process.env.CORS_ORIGIN,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'Safelance Node.js Backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
        }
    });
});

// API endpoint information
app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Safelance API v1.0.0',
        endpoints: {
            clients: {
                register: 'POST /api/clients/register',
                login: 'POST /api/clients/login',
                profile: 'GET /api/clients/profile',
                updateProfile: 'PUT /api/clients/profile',
                changePassword: 'PUT /api/clients/change-password',
                logout: 'POST /api/clients/logout',
                deleteAccount: 'DELETE /api/clients/account'
            },
            freelancers: {
                register: 'POST /api/freelancers/register',
                login: 'POST /api/freelancers/login',
                browse: 'GET /api/freelancers',
                profile: 'GET /api/freelancers/profile',
                updateProfile: 'PUT /api/freelancers/profile',
                applyToJob: 'POST /api/freelancers/apply/:jobId',
                changePassword: 'PUT /api/freelancers/change-password',
                logout: 'POST /api/freelancers/logout',
                deleteAccount: 'DELETE /api/freelancers/account'
            }
        },
        documentation: 'Contact admin for API documentation'
    });
});

// API Routes
app.use('/api/clients', clientRoutes);
app.use('/api/freelancers', freelancerRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
    console.log(`❓ 404: ${req.method} ${req.originalUrl} not found`);
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        statusCode: 404,
        timestamp: new Date().toISOString()
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error";
    
    console.error("❌ Server Error:", {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });
    
    // Don't expose internal errors in production
    const errorMessage = process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : message;
    
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        statusCode,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

export { app };
