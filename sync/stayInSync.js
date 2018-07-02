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
  event.watch(callback);
};

const syncNewRecords = (recordsEvent, linnia) => {
  watchEvent(recordsEvent, (event) => {
    const args = event.returnValues;
    linnia.getRecord(args.dataHash)
      .then(record => Record.findOrCreate({
        where: serializeRecord({ args }, record)
      }));
  });
};

const syncRevokedPermissions = (permissionsEvent) => {
  watchEvent(permissionsEvent, (event) => {
    Permission.destroy({
      where: {
        owner: event.returnValues.owner,
        viewer: event.returnValues.viewer,
        dataHash: event.returnValues.dataHash
      }
    });
  });
};

const syncNewUsers = (usersEvent) => {
  watchEvent(usersEvent, (event) => {
    const args = event.returnValues;
    User.findOrCreate({
      where: serializeUser({ args })
    });
  });
};

const syncNewPermissions = (permissionsEvent, linnia) => {
  watchEvent(permissionsEvent, (event) => {
    const args = event.returnValues;
    linnia.getPermission(args.dataHash, args.viewer)
      .then(permission => Permission.findOrCreate({
        where: serializePermission({ args }, permission)
      }));
  });
};
