const Booking = require('../models/bookingModel');
const Property = require('../models/propertyModel');

// CREAR RESERVA
const createBooking = async (req, res, next) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;

    // Verificar que el alojamiento existe
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' });
    }

    // Calculo de número de días y precio total
    const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * property.pricePerNight;

    const booking = await Booking.create({ 
      property: propertyId,
      guest: req.user._id,
      checkIn,
      checkOut,
      totalPrice,
      status: 'confirmed'
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// OBTENER MIS RESERVAS
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate({
        path: 'property',
        select: 'title location images owner',
        populate: {
          path: 'owner',
          select: 'username'
        }
      });

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// CANCELAR RESERVA
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Verificación de que la reserva sea del usuario
    if (booking.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ message: 'Reserva cancelada' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking };
