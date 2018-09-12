const { User, Record, Permission } = require('./../models');

const {
  serializeRecord,
  serializeUser,
  serializePermission
} = require('./serialization');

module.exports = (linnia, blockNumber) => {

  blockNumber = blockNumber;

  const {
    LinniaRecordAdded,
    LinniaAccessGranted,
    LinniaUserRegistered,
  } = linnia.events;

  return Promise.all([
    syncPastRecords(LinniaRecordAdded, linnia, blockNumber),
    syncPastUsers(LinniaUserRegistered, blockNumber),
    syncPastPermissions(LinniaAccessGranted, linnia, blockNumber)
  ])
  .catch(panic);
};

let totalCalls = 0
let callsDone = 0

const getPastEvents = (event, blockNumber) => {
  let results = []
  let step = 50000
  let firstBlock = 0
  let endBlock = 3800000

  while(endBlock < blockNumber+50000){
    results.push(
      new Promise((resolve, reject) => {
        return event({}, {
          fromBlock: firstBlock,
          toBlock: endBlock
        }).get((err, events) => {
          err ? reject(err) : resolve(events);
        });
      })
    );
    firstBlock = endBlock
    endBlock += step
  }
  return results
};

const syncPastRecords = (recordsEvent, linnia, blockNumber) => {
  return Promise.all(getPastEvents(recordsEvent, blockNumber)).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
      return linnia.getRecord(event.args.dataHash)
        .then(record => serializeRecord(event, record))
        .then(record => {
          // Add record to DB
          Record.findOrCreate({
            where: record
          })
        }
      );
    }));
  });
};

const syncPastPermissions = (permissionsEvent, linnia, blockNumber) => {
  return Promise.all(getPastEvents(permissionsEvent, blockNumber)).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    return Promise.all(events.map((event) => {
      return linnia.getPermission(event.args.dataHash, event.args.viewer)
        .then(per => serializePermission(event, per))
        .then(permission => {
          // Add permission to DB
            permission.canAccess && Permission.findOrCreate({
              where: permission
          })}
        );
    }));
  });
};

const syncPastUsers = (usersEvent, blockNumber) => {
  let totalUsers, count;
  return Promise.all(getPastEvents(usersEvent, blockNumber)).then(eventsArrays => {
      let events = [].concat.apply([], eventsArrays);
      return events.map(serializeUser)
    })
    .then(users => Promise.all(users.map((user) => {
      // Add users to DB
      return User.findOrCreate({ where: user });
    })));
};

const panic = (err) => {
  console.error('Sync failed!');
  console.error(err);
  process.exit(1);
};