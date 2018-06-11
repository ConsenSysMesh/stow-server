const Record = require('./../models').record;
const Sequelize = require('sequelize');

// This endpoint is used to add new records to the server
module.exports = (req, res) => {

  // No datahash returns 400
  if(!req.body.dataHash){
    res.status(400).send({ error: 'data hash is missing' })
  }

  // No owner returns 400
  if(!req.body.owner){
    res.status(400).send({ error: 'owner is missing' })
  }

  // No metadata returns 400
  if(!req.body.metadata){
    res.status(400).send({ error: 'metadata is missing' })
  }

  // Create the record
  Record.create({
    dataHash: req.body.dataHash,
    owner: req.body.owner,
    metadata: req.body.metadata,
  }).then(record => res.json(record))

  // Catch errors when creting the record
  .catch(function (err) {
    if(err.errors){
      const errors = err.errors.map(x => x.message);
      res.status(400).send({ errors: errors })
    }
  });
};
