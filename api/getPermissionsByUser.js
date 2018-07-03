const { Permission } = require('./../models');

module.exports = (req, res, next) => {
  const address = req.params.address.toLowerCase();

  Promise.all([
    asViewer(address),
    asOwner(address)
  ])
  .then(results => res.json({
    asViewer: results[0],
    asOwner: results[1]
  }))
  .catch(next);
};

const asViewer = (viewer) => {
  return Permission.findAll({
    where: {
      viewer
    }
  });
};

const asOwner = (owner) => {
  return Permission.findAll({
    where: {
      owner
    }
  });
};
