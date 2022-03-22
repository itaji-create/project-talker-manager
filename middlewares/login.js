const bcrypt = require('bcrypt');

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const token = (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, (errBcrypt, hash) => {
    if (errBcrypt) return res.status(500).json({ error: errBcrypt.message })
    
    res.status(200).json({ token: hash.slice(10, 26) });
  })
};

module.exports = { validPassword, validEmail, token };