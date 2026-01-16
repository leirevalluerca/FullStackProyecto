// Route para crear, consultar y cancelar reservas
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const checkAvailability = require('../middlewares/checkAvailability');
const withDB = require('../middlewares/withDB');

const { createBooking, getMyBookings, cancelBooking } = require('../controllers/bookingController');

const { createBookingValidation } = require('../validators/bookingValidator');

router.post('/',  withDB, auth, createBookingValidation, validate, checkAvailability, createBooking);
router.get('/my-bookings',  withDB, auth, getMyBookings);
router.delete('/:id',  withDB, auth, cancelBooking);

module.exports = router;