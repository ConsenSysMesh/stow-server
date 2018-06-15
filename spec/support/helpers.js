const truncate = {
  truncate: true,
  cascade: true
};

const cleanDatabase = async (done) => {
  const { User, Record, Permission } = require('./../../models');

  await Promise.all([
    Permission.destroy(truncate),
    User.destroy(truncate),
    Record.destroy(truncate)
  ]);

  done();
};

module.exports = {
  cleanDatabase
}
