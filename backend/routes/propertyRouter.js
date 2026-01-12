// Route que sirve para crear reservas, ver las reservas propias y cancelar las reservas que ya has hecho previamente
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const isHost = require('../middlewares/isHost');
const isOwner = require('../middlewares/isOwner');
const validate = require('../middlewares/validate');
const upload = require('../middlewares/uploadImg');

const { createProperty, getAllProperties, getPropertyById, getPropertiesByUserId, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { createPropertyValidation } = require('../validators/propertyValidator');

const Property = require('../models/propertyModel');

// Público
router.get('/', getAllProperties);

// Protegido
router.post('/', auth, upload.array('images', 10), createPropertyValidation, validate, createProperty);
router.get('/my-properties', auth, getPropertiesByUserId);

// Público
router.get('/:id', getPropertyById);

// Protegido
router.put( '/:id', auth, isHost, createPropertyValidation, validate, isOwner(Property), updateProperty);
router.delete('/:id', auth, isHost, isOwner(Property), deleteProperty);

module.exports = router;