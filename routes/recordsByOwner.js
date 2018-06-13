const Record = require('./../models').record;
const Sequelize = require('sequelize');

module.exports = (req, res) => {
  Record.findAll({
    where: {
      owner: {
        [Sequelize.Op.eq]: req.param('owner'),
      }
    }
  }).then(records => {
    res.json(records)
  })

  // Catch errors
  .catch(function (err) {
    res.status(500).send('Error')
  });
};
