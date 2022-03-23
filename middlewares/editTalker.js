const fs = require('fs');

const editTalker = (req, res) => {
  const { id } = req.params;
  const { 
    name,
    age,
    talk: { watchedAt, rate },
   } = req.body;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const i = talkers.findIndex((e) => e.id === parseInt(id, 10));

  if (i === -1) return res.status(404).json({ message: 'Person not found!' });

  const updatedPerson = { ...talkers[i], name, age, talk: { watchedAt, rate } };

  talkers[i] = updatedPerson;

  fs.writeFileSync('talker.json', JSON.stringify(talkers));

  res.status(200).json(updatedPerson);
};

module.exports = editTalker;