const { Record, User } = require('./../models');

module.exports = (req, res, next) => {
  const address = req.params.userAddress;

  User.findOne({ where: { address } })
    .then(user => user.getPermissionedRecords())
    .then(records => res.json(records))
    .catch(() => res.status(404).json({
      message: 'Sorry, we could not find that user!'
    }));
};
