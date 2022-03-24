const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

const talkerRouter = require('./router/talkerRouter');
const loginRouter = require('./router/loginRouter');

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);
