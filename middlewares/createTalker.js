const fs = require('fs');

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
  res.status(201).json(pushNewPerson(req.body));
};

module.exports = createTalker;
