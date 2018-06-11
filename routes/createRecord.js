const Record = require('./../models').record;

module.exports = (req, res) => {
  console.log(req.body)
  Record.create({
    dataHash: req.body.dataHash,
    owner: req.body.owner,
    metadata: req.body.metadata,
  }).then(record => res.json(record));
};
