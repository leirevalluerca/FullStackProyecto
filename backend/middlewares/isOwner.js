// Para evitar accesos no válidos

const isOwner = (Model, field = 'owner') => {
  return async (req, res, next) => {
    const resource = await Model.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Recurso no encontrado'
      });
    }

    if (resource[field].toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'No tienes permiso para modificar este campo'
      });
    }

    req.resource = resource;
    next();
  };
};

module.exports = isOwner;
