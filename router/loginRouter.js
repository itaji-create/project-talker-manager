const express = require('express');

const router = express.Router();

const token = require('../middlewares/generateToken');
const validPassword = require('../middlewares/validation/validPassword');
const validEmail = require('../middlewares/validation/validEmail');

router.post('/', validEmail, validPassword, token);

module.exports = router;
