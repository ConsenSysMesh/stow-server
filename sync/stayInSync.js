const { User, Record, Permission } = require('./../models');
const {
  serializeRecord,
  serializeUser,
  serializePermission
} = require('./serialization');

module.exports = (linnia) => {
  const { users, records, permissions } = linnia.events;

  syncNewPermissions(permissions, linnia);
  syncNewRecords(records, linnia);
  syncNewUsers(users);
};

const watchEvent = (event, callback) => {
  event().watch((err, event) => {
    if (err) {
      console.error(err);
    } else {
      callback(event);
    }
  });
};

const syncNewRecords = (recordsEvent, linnia) => {
  watchEvent(recordsEvent, (event) => {
    linnia.getRecord(event.args.dataHash)
      .then(record => Record.findOrCreate({
        where: serializeRecord(event, record)
      }));
  });
};

const syncNewUsers = (usersEvent) => {
  watchEvent(usersEvent, (event) => {

    User.findOrCreate({
      where: serializeUser(event)
    });
  });
};

const syncNewPermissions = (permissionsEvent, linnia) => {
  watchEvent(permissionsEvent, (event) => {
    linnia.getPermission(event.args.dataHash, event.args.viewer)
      .then(permission => Permission.findOrCreate({
        where: serializePermission(event, permission)
      }))
  });
};
