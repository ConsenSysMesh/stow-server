const { Record, User } = require('./../models');

module.exports = (req, res, next) => {
  const address = req.params.userAddress;

  User.findOne({ where: { address } })
    .then(user => user.getPermissionedRecords())
    .then(records => res.json(records))
    .catch(err => res.status(500).json(err));
};
