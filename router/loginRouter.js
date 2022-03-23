const express = require('express');

const router = express.Router();

const token = require('../middlewares/login');
const validPassword = require('../middlewares/validation/validPassword');
const validEmail = require('../middlewares/validation/validEmail');

router.post('/', validEmail, validPassword, token);

module.exports = router;
