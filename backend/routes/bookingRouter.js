// Route para crear, consultar y cancelar reservas
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const checkAvailability = require('../middlewares/checkAvailability');

const { createBooking, getMyBookings, cancelBooking } = require('../controllers/bookingController');

const { createBookingValidation } = require('../validators/bookingValidator');

router.post('/', auth, createBookingValidation, validate, checkAvailability, createBooking);
router.get('/my-bookings', auth, getMyBookings);
router.delete('/:id', auth, cancelBooking);

module.exports = router;