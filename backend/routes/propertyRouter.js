const express = require('express');
const router = express.Router();

const withDB = require('../middlewares/withDB');
const auth = require('../middlewares/auth');
const isHost = require('../middlewares/isHost');
const isOwner = require('../middlewares/isOwner');
const validate = require('../middlewares/validate');
const upload = require('../middlewares/uploadImg');

const {
  createProperty,
  getAllProperties,
  getPropertyById,
  getPropertiesByUserId,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

const { createPropertyValidation } = require('../validators/propertyValidator');
const Property = require('../models/propertyModel');

// Público
router.get('/', withDB, getAllProperties);

// Protegido - crear propiedad
router.post('/', withDB, auth, upload.array('images', 10), createPropertyValidation, validate, createProperty);

// Protegido - propiedades del user
router.get('/my-properties', withDB, auth, getPropertiesByUserId);

// Público
router.get('/:id', withDB, getPropertyById);

// Protegido - actualizar propiedad
router.put('/:id', withDB, auth, isHost, upload.array('images'), isOwner(Property), updateProperty);

// Protegido - borrar propiedad
router.delete( '/:id', withDB, auth, isHost, isOwner(Property), deleteProperty);

module.exports = router;
