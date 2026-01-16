const express = require('express');
const router = express.Router();

const { register, login, me } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const withDB = require('../middlewares/withDB');

const { registerValidation, loginValidation } = require('../validators/userValidator');

router.post('/register', withDB, registerValidation, validate, register);
router.post( '/login', withDB, loginValidation, validate, login );
router.get('/me', withDB, auth, me);

module.exports = router;
