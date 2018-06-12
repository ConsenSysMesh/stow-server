const Record = require('./../models').record;

module.exports = (req, res) => {
  try {
    Record.findAll().then(records => {
      res.json(records)
    });
  } catch(err){
    res.status(500).send('Error')
  }
};
