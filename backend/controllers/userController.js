const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// REGISTER
const register = async (req, res, next) => {
  try {
    const { username, name, surname, birthdate, email, password } = req.body;

    // Comprobamos si hay dos usurios con el mismo username y email para que no se dupliquen
    const exists = await User.findOne({ $or: [{ username }, { email }] });

    if (exists) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'Username o email ya registrado'
      });
    }

    // Encriptación de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, name, surname, birthdate, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    next(error); // lo gestiona errorHandler
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Busqueda del usuario incluyendo la contraseña
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Mirar si la contraseña y usuario hacen match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generamos el token pra que expire en 1 hora
    const token = jwt.sign( { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// INFO DEL USUARIO LOGGEADO
const me = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { register, login, me };
