// Middleware que sirve para los errores
const internalServerError = (err, req, res, next) => {  
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Ha ocurrido un error inesperado en el servidor"
  });
};
module.exports = internalServerError;