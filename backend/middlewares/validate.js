// Middleware que sirve para validar datos (se ha instalado la librería express-validator para poder usarlo)
// Con este middleware se evitan datos inválidos
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Bad Request',
      errors: errors.array()
    });
  }
  next();
};

module.exports = validate;
