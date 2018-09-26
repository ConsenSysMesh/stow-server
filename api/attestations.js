const { Attestation } = require('./../models');

module.exports = (req, res, next) => {
  const dataHash = req.params.dataHash;
  Attestation.findAll({
      where: {
        dataHash
      }
    })
    .then((attestations) => {
      return res.json(attestations);
    })
    .catch(next);
};
