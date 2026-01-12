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

// Conexión a MongoDB optimizada para Vercel
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  cachedDb = connection;
  console.log('MongoDB connected');
  return connection;
}

// Conectar antes de cada request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/bookings', bookingRouter);

// Ruta raíz para testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling
app.use(notFound);
app.use(internalServerError);

// NO USAR app.listen() - Vercel lo maneja
module.exports = app;