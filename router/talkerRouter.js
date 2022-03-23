const express = require('express');

const router = express.Router();

const getAllTalkers = require('../middlewares/getAllTalkers');

const getTalkerById = require('../middlewares/getTalkerById');

const createTalker = require('../middlewares/createTalker');
const validAge = require('../middlewares/validation/validAge');
const validData = require('../middlewares/validation/validData');
const validName = require('../middlewares/validation/validName');
const validRate = require('../middlewares/validation/validRate');
const validTalk = require('../middlewares/validation/validTalk');
const validToken = require('../middlewares/validation/validToken');

const editTalker = require('../middlewares/editTalker');

router.get('/', getAllTalkers);

router.get('/:id', getTalkerById);

router
  .post('/', validToken, validName, validAge, validTalk, validRate, validData, createTalker);

router.put('/:id', validToken, validName, validAge, validTalk, validRate, validData, editTalker);

module.exports = router;