const { User, Record, Permission } = require('./../models');
const {
  serializeRecord,
  serializeUser,
  serializePermission
} = require('./serialization');

module.exports = (linnia) => {
  const { users, records, permissions } = linnia.events;

  syncNewRecords(records, linnia);
  syncNewUsers(users);
  syncNewPermissions(permissions);
};

const watchEvent = (event, callback) => {
  event().watch((err, event) => {
    if (!err) callback(event);
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

const syncNewPermissions = (permissionsEvent) => {
  watchEvent(permissionsEvent, (event) => {

    Permission.findOrCreate({
      where: serializePermission(event)
    });
  });
};
