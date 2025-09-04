import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

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

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log(`   Origin: ${req.headers.origin || 'none'}`);
    console.log(`   Auth: ${req.headers.authorization ? 'present' : 'none'}`);
    next();
});

// Routes - ORDER MATTERS!
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'AuraVox Backend is running!',
        cors: process.env.CORS_ORIGIN,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'AuraVox Node.js Backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Write apis here


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error";
    console.error("❌ Server Error:", err);
    
    // Don't expose internal errors in production
    const errorMessage = process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : message;
    
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
        statusCode,
        timestamp: new Date().toISOString()
    });
});

export { app };