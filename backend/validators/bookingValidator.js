const { body } = require('express-validator');

exports.createBookingValidation = [
  body('propertyId')
    .notEmpty().withMessage('propertyId requerido')
    .isMongoId().withMessage('ID inválido'),

  body('checkIn')
    .isISO8601().withMessage('Fecha de entrada inválida'),

  body('checkOut')
    .isISO8601().withMessage('Fecha de salida inválida')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('checkOut debe ser posterior a checkIn');
      }
      return true;
    })
];