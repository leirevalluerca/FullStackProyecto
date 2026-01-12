// Este middleware sirve para evitar tener 2 reservas en las mismas fechas.
// Así solo se podrá reservar en una única fecha
const Booking = require('../models/bookingModel');

const checkAvailability = async (req, res, next) => {
  const { propertyId, checkIn, checkOut } = req.body;

  const overlapping = await Booking.find({
    property: propertyId,
    status: 'confirmed',
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) }
  });

  if (overlapping.length > 0) {
    return res.status(400).json({
      error: 'Unavailable',
      message: 'El alojamiento no está disponible en esas fechas'
    });
  }

  next();
};

module.exports = checkAvailability;