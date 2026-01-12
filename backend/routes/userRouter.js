const express = require('express');
const router = express.Router();

const { register, login, me } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const { registerValidation, loginValidation } = require('../validators/userValidator');

router.post('/register', registerValidation, validate, register);
router.post( '/login', loginValidation, validate, login );
router.get('/me', auth, me);

module.exports = router;
