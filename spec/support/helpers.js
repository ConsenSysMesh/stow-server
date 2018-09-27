const truncate = {
  truncate: true,
  cascade: true
};

const cleanDatabase = async (done) => {
  const { User, Record, Permission, Attestation } = require('./../../models');

  await Permission.destroy(truncate);
  await User.destroy(truncate);
  await Record.destroy(truncate);
  await Attestation.destroy(truncate);

  done();
};

module.exports = {
  cleanDatabase
};
