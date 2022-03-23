const validData = (req, res, next) => {
  // dateRegex feito com base no exemplo site https://www.delftstack.com/pt/howto/javascript/javascript-validate-date/#:~:text=Validar%20data%20usando%20express%C3%B5es%20regulares%20em%20JavaScript,-Express%C3%A3o%20regular%20%C3%A9&text=Cada%20s%C3%ADmbolo%20ou%20express%C3%A3o%20em,%2Fmm%2Fyyy%20em%20JavaScript.&text=A%20express%C3%A3o%20regular%20%2F%5E(0,)%24%2F%20tem%203%20grupos.
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19[1-9]\d|20\d\d|[1-9][1-9])$/;
  const { talk: { watchedAt } } = req.body;
  if (!dateRegex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validData;