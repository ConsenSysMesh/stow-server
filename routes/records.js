const Record = require('./../models').record;

module.exports = (req, res) => {
  Record.findAll().then(records => {
    res.json(records)
  })
  
  // Catch errors
  .catch(function (err) {
    const errors = err.errors.map(x => x.message);
    res.status(400).send({ errors: errors })
  });
};
