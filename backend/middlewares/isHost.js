// Middleware que sirve para evitar que cualquier pesona pueda publicar properties
const isHost = (req, res, next) => {
  if (!req.user?.isHost) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Debes ser anfitrión para realizar esta acción'
    });
  }
  next();
};

module.exports = isHost;
