const Record = require('./../models').record;

module.exports = (req, res) => {
  Record.findAll().then(records => {
    res.json(records)
  })
  
  // Catch errors
  .catch(function (err) {
    res.status(500).send('Error')
  });
};
