// Middleware que sirve para la autenticación de usuarios (JWT)
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token inválido o ausente'
    });
  }

  const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error: 'Unauthorized', message: 'Usuario no encontrado'});
        }
        req.user = user;
    } catch(error){
        return res.status(401).json({error: 'Unauthorized', message: 'Token inválido o ausente'});
    }

    next();
};

module.exports = auth;