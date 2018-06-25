const { User, Record, Permission } = require('./../models');
const {
  serializeRecord,
  serializeUser,
  serializePermission
} = require('./serialization');

module.exports = (linnia) => {
  const {
    LogAccessGranted,
    LogRecordAdded,
    LogUserRegistered,
    LogAccessRevoked
  } = linnia.events;

  syncNewPermissions(LogAccessGranted, linnia);
  syncRevokedPermissions(LogAccessRevoked);
  syncNewRecords(LogRecordAdded, linnia);
  syncNewUsers(LogUserRegistered);
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

const syncRevokedPermissions = (permissionsEvent) => {
  watchEvent(permissionsEvent, (event) => {
    Permission.destroy({
      where: {
        owner: event.args.owner,
        viewer: event.args.viewer,
        dataHash: event.args.dataHash
      }
    });
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
