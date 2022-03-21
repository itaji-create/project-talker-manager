const fs = require('fs');

const getAllTalkers = (req, res) => {
  fs.readFile('talker.json', (err, content) => {
    if (err) {
      console.log(err.message);
      return;
    }
    res.status(200).json(JSON.parse(content.toString('utf8')));
  });
};

module.exports = getAllTalkers;