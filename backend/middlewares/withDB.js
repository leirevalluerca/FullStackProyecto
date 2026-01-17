// Middleware para asegurar la conexión a MongoDB antes de procesar cada petición
const connectDB = require('../config/db');

module.exports = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
};