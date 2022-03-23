const fs = require('fs');

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const i = talkers.findIndex((e) => e.id === parseInt(id, 10));

  if (i === -1) return res.status(404).json({ message: 'Person not found!' });

  talkers.splice(i, 1);

  fs.writeFileSync('talker.json', JSON.stringify(talkers));

  res.status(204).json();
};

module.exports = deleteTalker;