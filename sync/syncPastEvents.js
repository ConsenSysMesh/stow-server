const { User, Record, Permission } = require('./../models');
const {
  serializeRecord,
  serializeUser,
  serializePermission
} = require('./serialization');

const firstBlock = 0;
const latestBlock = 'latest';

module.exports = (linnia) => {
  const { records, permissions, users } = linnia.events;

  return Promise.all([
    syncPastRecords(records, linnia),
    syncPastUsers(users)
  ])
  .then(() => syncPastPermissions(permissions, linnia))
  .catch(panic)
};

const getPastEvents = (event) => {
  return new Promise((resolve, reject) => {
    return event({}, {
      fromBlock: firstBlock,
      toBlock: latestBlock
    }).get((err, events) => {
      err ? reject(err) : resolve(events);
    });
  });
};

const syncPastRecords = (recordsEvent, linnia) => {
  return getPastEvents(recordsEvent)
    .then(events => {
      return Promise.all(events.map((event) => {
        return linnia.getRecord(event.args.dataHash)
          .then(record => serializeRecord(event, record));
      }));
    })
    .then(records => Promise.all(records.map((record) => {
      return Record.findOrCreate({ where: record });
    })));
};

const syncPastPermissions = (permissionsEvent, linnia) => {
  return getPastEvents(permissionsEvent)
    .then(events => {
      return Promise.all(events.map((event) => {
        return linnia.getPermission(event.args.dataHash, event.args.viewer)
          .then(per => serializePermission(event, per));
      }));
    })
    .then(pers => Promise.all(pers.map((per) => {
      return Permission.findOrCreate({ where: per });
    })))

};

const syncPastUsers = (usersEvent) => {
  return getPastEvents(usersEvent)
    .then(events => events.map(serializeUser))
    .then(users => Promise.all(users.map((user) => {
      return User.findOrCreate({ where: user });
    })));
};

const panic = (err) => {
  console.error('Sync failed!');
  console.error(err);
  process.exit(1);
};


