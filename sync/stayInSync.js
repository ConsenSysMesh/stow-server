const { User, Record, Permission } = require('./../models');

const {
  serializeRecord,
  serializeUser,
  serializePermission,
  serializeSigUpdate
} = require('./serialization');

module.exports = (linnia) => {

  const {
    LinniaAccessGranted,
    LinniaRecordAdded,
    LinniaUserRegistered,
    LinniaAccessRevoked,
    LinniaRecordSigAdded
  } = linnia.events;

  syncNewPermissions(LinniaAccessGranted, linnia);
  syncRevokedPermissions(LinniaAccessRevoked);
  syncNewRecords(LinniaRecordAdded, linnia);
  syncNewUsers(LinniaUserRegistered);
  syncNewSigUpdate(LinniaRecordSigAdded, linnia);
};

const watchEvent = (event, callback) => {
  event.watch(callback);
};

const syncNewSigUpdate = (sigEvent, linnia) => {
  watchEvent(sigEvent, (event) => {
    const args = event.returnValues;
    linnia.getRecord(args.dataHash)
      .then(updatedRecord => {
        return Record.find({
        where: {
          dataHash: args.dataHash
        }
        })
        .then(record => {
        record && record.update(
          serializeSigUpdate(updatedRecord.sigCount, updatedRecord.irisScore)
      )
    });
  });
});
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
        owner: event.returnValues.owner.toLowerCase(),
        viewer: event.returnValues.viewer.toLowerCase(),
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
