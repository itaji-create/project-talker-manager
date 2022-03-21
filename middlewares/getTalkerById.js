const fs = require('fs');

const getTalkerById = (req, res) => {
  const { id } = req.params;
  fs.readFile('talker.json', (err, content) => {    
    if (err) {
      console.log(err.message);
      return;
    }
    const talkers = JSON.parse(content.toString('utf8'));
    const talker = talkers.find((e) => e.id === parseInt(id, 10));

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    
    res.status(200).json(talker);
  });
};

module.exports = getTalkerById;