// Con db.js se gestiona la conexión a MongoDB para optimizar el rendimiento en entornos serverless, 
// reutilizando conexiones existentes.

// Vercel es serverless!!

const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
// Conexión con Mongo
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  // Nueva promesa de conexión si no existe
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Desactivado para evitar errores en serverless
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;