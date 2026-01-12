const { body } = require('express-validator');

exports.registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('El username es obligatorio')
    .isLength({ min: 4 }).withMessage('Mínimo 4 caracteres'),

  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
];

exports.loginValidation = [
  body('username')
    .notEmpty().withMessage('Username obligatorio'),

  body('password')
    .notEmpty().withMessage('Password obligatorio')
];
