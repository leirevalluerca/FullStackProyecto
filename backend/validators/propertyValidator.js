const { body } = require('express-validator');

exports.createPropertyValidation = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio'),

  body('description')
    .notEmpty().withMessage('La descripción es obligatoria'),

  body('location.address')
    .notEmpty()
    .withMessage('La dirección es obligatoria'),

  body('pricePerNight')
    .isFloat({ min: 1 }).withMessage('Precio inválido'),

  body('maxGuests')
    .isInt({ min: 1 }).withMessage('Debe haber al menos 1 huésped'),

  body('location.city')
    .notEmpty().withMessage('La ciudad es obligatoria'),

  body('location.country')
    .notEmpty().withMessage('El país es obligatorio')
];