require('dotenv').config();

const api = require('./api');
const linnia = require('./services/linnia');
const { User, Record, Permission } = require('./models');

api.initialize();

linnia.initialize()
  .then(() => {
    linnia.records$.subscribe((record) => {
      Record.findOrCreate({
        where: record
      }).catch(console.log);
    });

    linnia.users$.subscribe((user) => {
      User.findOrCreate({
        where: user
      }).catch(console.log);
    });

    linnia.permissions$.subscribe((permission) => {
      Permission.findOrCreate({
        where: {
          dataHash: permission.dataHash,
          userAddress: permission.viewer
        }
      }).catch(console.log);
    });
  });
