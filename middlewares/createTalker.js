const fs = require('fs');

const validToken = (req, res, token = '') => {
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const validRate = (req, res) => {
  const { talk: { rate } } = req.body;
  if (rate > 5 || rate < 1 || !Number.isInteger(rate)) { 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validData = (req, res) => {
// dateRegex feito com base no exemplo site https://www.delftstack.com/pt/howto/javascript/javascript-validate-date/#:~:text=Validar%20data%20usando%20express%C3%B5es%20regulares%20em%20JavaScript,-Express%C3%A3o%20regular%20%C3%A9&text=Cada%20s%C3%ADmbolo%20ou%20express%C3%A3o%20em,%2Fmm%2Fyyy%20em%20JavaScript.&text=A%20express%C3%A3o%20regular%20%2F%5E(0,)%24%2F%20tem%203%20grupos.
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19[1-9]\d|20\d\d|[1-9][1-9])$/;
  const { talk: { watchedAt } } = req.body;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validAge = (req, res) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validName = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validTalk = (req, res) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
};

function pushNewPerson(newTalker) {
  try {
    const talkers = fs.readFileSync('talker.json');
    const talkersObj = JSON.parse(talkers);
    const registeredPerson = { ...newTalker, id: talkersObj.length + 1 };
    talkersObj.push(registeredPerson);
    fs.writeFileSync('talker.json', JSON.stringify(talkersObj));
    return registeredPerson;
  } catch (error) {
    console.log(error.message); 
  }
}

const createTalker = (req, res) => {
  const { authorization } = req.headers;
  validToken(req, res, authorization);
  validName(req, res);
  validAge(req, res);
  validTalk(req, res);
  validRate(req, res);
  validData(req, res);
  res.status(201).json(pushNewPerson(req.body));
};

module.exports = createTalker;
