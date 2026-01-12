const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const userRouter = require('./routes/userRouter');
const propertyRouter = require('./routes/propertyRouter');
const bookingRouter = require('./routes/bookingRouter');

const notFound = require('./middlewares/404');
const internalServerError = require('./middlewares/500');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (con manejo de errores mejorado)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Middleware para conectar DB antes de cada request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/bookings', bookingRouter);

// Error handling
app.use(notFound);
app.use(internalServerError);

// NO usar app.listen() en Vercel
// Solo exportar la app
module.exports = app;