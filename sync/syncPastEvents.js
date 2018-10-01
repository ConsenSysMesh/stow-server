const {
  User,
  Record,
  Permission,
  Attestation
} = require('./../models');

const {
  serializeRecord,
  serializeUser,
  serializePermission,
  serializeAttestation
} = require('./serialization');

module.exports = (linnia, blockNumber) => {

  const {
    LinniaRecordAdded,
    LinniaAccessGranted,
    LinniaUserRegistered,
    LinniaRecordSigAdded
  } = linnia.events;

  return Promise.all([
      syncPastRecords(LinniaRecordAdded, linnia, blockNumber),
      syncPastUsers(LinniaUserRegistered, blockNumber),
      syncPastPermissions(LinniaAccessGranted, linnia, blockNumber),
      syncPastAttestations(LinniaRecordSigAdded, blockNumber)
    ])
    .catch(panic);
};

const getPastEvents = (event, blockNumber) => {
  let results = [];
  let step = 50000;
  let fromBlock = 0;
  let toBlock = 3800000;

  while (fromBlock < blockNumber + step) {
    results.push(
      new Promise((resolve, reject) => {
        return event({}, {
          fromBlock,
          toBlock,
        }).get((err, events) => {
          err ? reject(err) : resolve(events);
        });
      })
    );
    fromBlock = toBlock;
    toBlock += step;
  }
  return Promise.all(results);
};

const syncPastRecords = (recordsEvent, linnia, blockNumber) => {
  return getPastEvents(recordsEvent, blockNumber).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
      return linnia.getRecord(event.args.dataHash)
        .then(record => serializeRecord(event, record))
        .then(record => {
          // Add record to DB
          Record.findOrCreate({
            where: record
          })
        });
    }));
  });
};

const syncPastPermissions = (permissionsEvent, linnia, blockNumber) => {
  return getPastEvents(permissionsEvent, blockNumber).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
      return linnia.getPermission(event.args.dataHash, event.args.viewer)
        .then(per => serializePermission(event, per))
        .then(permission => {
          // Add permission to DB
          permission.canAccess && Permission.findOrCreate({
            where: permission
          })
        });
    }));
  });
};

const syncPastUsers = (usersEvent, blockNumber) => {
  return getPastEvents(usersEvent, blockNumber).then(eventsArrays => {
      let events = [].concat.apply([], eventsArrays);
      return events.map(serializeUser);
    })
    .then(users => Promise.all(users.map((user) => {
      // Add users to DB
      return User.findOrCreate({
        where: user
      });
    })));
};

const syncPastAttestations = (attestationsEvent, blockNumber) => {
  return getPastEvents(attestationsEvent, blockNumber).then(eventsArrays => {
      let events = [].concat.apply([], eventsArrays);
      return events.map(serializeAttestation);
    })
    .then(attestations => Promise.all(attestations.map((attestation) => {
      // Add attestations to DB
      return Attestation.findOrCreate({
        where: attestation
      });
    })));
};

const panic = (err) => {
  console.error('Sync failed!');
  console.error(err);
  process.exit(1);
};
