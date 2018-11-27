const { User, Record, Permission, Attestation } = require('./../models');

const {
  serializeRecord,
  serializeUser,
  serializePermission,
  serializeSigUpdate,
  serializeAttestation
} = require('./serialization');

module.exports = stow => {

  const {
    StowAccessGranted,
    StowRecordAdded,
    StowUserRegistered,
    StowAccessRevoked,
    StowRecordSigAdded
  } = stow.events;

  syncNewPermissions(StowAccessGranted, stow);
  syncRevokedPermissions(StowAccessRevoked);
  syncNewRecords(StowRecordAdded, stow);
  syncNewUsers(StowUserRegistered);
  syncNewSigUpdate(StowRecordSigAdded, stow);
};

const watchEvent = (event, callback) => {
  event.watch(callback);
};

const syncNewSigUpdate = (sigEvent, stow) => {
  watchEvent(sigEvent, (event) => {
    const args = event.returnValues;
    stow.getRecord(args.dataHash)
      .then(updatedRecord => {
        return Record.find({
            where: {
              dataHash: args.dataHash
            }
          })
          .then(record => {
            return record && record.update(
              serializeSigUpdate(updatedRecord.sigCount, updatedRecord.irisScore)
            )
          })
          .then(() => {
            Attestation.findOrCreate({
              where: serializeAttestation({args})
            })
          });
      });
  });
};

const syncNewRecords = (recordsEvent, stow) => {
  watchEvent(recordsEvent, (event) => {
    const args = event.returnValues;
    stow.getRecord(args.dataHash)
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

const syncNewPermissions = (permissionsEvent, stow) => {
  watchEvent(permissionsEvent, (event) => {
    const args = event.returnValues;
    stow.getPermission(args.dataHash, args.viewer)
      .then(permission => Permission.findOrCreate({
        where: serializePermission({ args }, permission)
      }));
  });
};
