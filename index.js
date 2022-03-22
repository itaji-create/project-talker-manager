const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const { validPassword, validEmail, token } = require('./middlewares/login');
const createTalker = require('./middlewares/createTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getAllTalkers);

app.post('/login', validEmail, validPassword, token);

app.get('/talker/:id', getTalkerById);

app.post('/talker', createTalker);
