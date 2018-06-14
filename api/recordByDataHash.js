const { Record } = require('./../models');

module.exports = (req, res, next) => {
  const dataHash = req.params.dataHash;

  Record.findOne({
    where: {
      dataHash
    }
  })
  .then((record) => {
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({
        message: 'Sorry! No record found.'
      });
    }
  })
  .catch(next);
};
