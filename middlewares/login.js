const bcrypt = require('bcrypt');

const token = (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, (errBcrypt, hash) => {
    if (errBcrypt) return res.status(500).json({ error: errBcrypt.message });
    
    res.status(200).json({ token: hash.slice(10, 26) });
  });
};

module.exports = token;