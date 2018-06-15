const truncate = {
  truncate: true,
  cascade: true
};

const cleanDatabase = async (done) => {
  const { User, Record, Permission } = require('./../../models');

  await Permission.destroy(truncate);
  await User.destroy(truncate);
  await Record.destroy(truncate);

  done();
};

module.exports = {
  cleanDatabase
};
