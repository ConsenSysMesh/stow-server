require('dotenv').config();

const api = require('./api');
const linnia = require('./services/linnia');
const { User, Record, Permission } = require('./models');

api.initialize();

linnia
  .initialize()
  .then(() => {
    linnia.records$.subscribe((record) => {
      Record.findOrCreate({
        where: record
      });
    });

    linnia.users$.subscribe((event) => {
      User.findOrCreate({
        where: {
          address: event.user
        }
      });
    });

    linnia.permissions$.subscribe((permission) => {
      Permission.findOrCreate({
        where: {
          dataHash: permission.dataHash,
          userAddress: permission.viewer
        }
      });
    });
  });
