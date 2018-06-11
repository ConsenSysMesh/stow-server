const Record = require('./../models').record;

module.exports = (req, res) => {
  Record.findAll().then(records => {
    res.json(records)
  });
};
