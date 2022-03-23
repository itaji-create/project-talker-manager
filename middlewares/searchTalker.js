const fs = require('fs');

const searchTalker = (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const filteredTalkers = talkers.filter((e) => e.name.includes(q));
  if (filteredTalkers.length > 0) return res.status(200).json(filteredTalkers);
  res.status(200).json(talkers);
};

module.exports = searchTalker;