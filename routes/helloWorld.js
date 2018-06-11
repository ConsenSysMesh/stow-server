const Record = require('./../models').record;

module.exports = (req, res) => {
  Record.create({
    dataHash: '645eytrtghijkutj5',
    owner: 'John Doe',
    metadata: 'Meta Data',
  }).then(record => res.json(record));
};
