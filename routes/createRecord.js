const Record = require('./../models').record;
const Sequelize = require('sequelize');

// This endpoint is used to add new records to the server
module.exports = (req, res) => {

  // Create the record
  Record.create({
    dataHash: req.body.dataHash,
    owner: req.body.owner,
    metadata: req.body.metadata,
  }).then(record => res.json(record))

  // Catch errors when creting the record
  .catch((err) => {
    const errors = err.errors.map(x => x.message);
    res.status(400).send({ errors: errors })
  });
};
