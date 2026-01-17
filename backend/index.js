const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

const userRouter = require('./routes/userRouter');
const propertyRouter = require('./routes/propertyRouter');
const bookingRouter = require('./routes/bookingRouter');

const notFound = require('./middlewares/404');
const internalServerError = require('./middlewares/500');

dotenv.config();

/* // Logs para verificación
console.log('ENV TEST:', {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET
});

console.log('PORT:', process.env.PORT);
console.log(process.env.MONGO_URI ? 'Mongo URI OK' : 'Mongo URI MISSING');
console.log(process.env.JWT_SECRET ? 'JWT OK' : 'JWT MISSING'); */

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/bookings', bookingRouter);

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API running',
    endpoints: {
      users: '/api/users',
      properties: '/api/properties',
      bookings: '/api/bookings'
    }
  });
});

// Error handling
app.use(notFound);
app.use(internalServerError);

// Inicia el servidor solo en desarrollo (Vercel gestiona esto en producción)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;