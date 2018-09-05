const { User, Record, Permission } = require('./../models');
const {
  serializeRecord,
  serializeUser,
  serializePermission
} = require('./serialization');

module.exports = (linnia) => {
  const {
    LinniaRecordAdded,
    LinniaAccessGranted,
    LinniaUserRegistered
  } = linnia.events;

  return Promise.all([
    syncPastRecords(LinniaRecordAdded, linnia),
    syncPastUsers(LinniaUserRegistered),
    syncPastPermissions(LinniaAccessGranted, linnia)
  ])
  .catch(panic);
};

let totalCalls = 0
let callsDone = 0

const getPastEvents = (event) => {
  let results = []
  let step = 50000
  let firstBlock = 0
  let endBlock = 3800000

  while(endBlock < 4000000){
    totalCalls+=1
    results.push(
      new Promise((resolve, reject) => {
        return event({}, {
          fromBlock: firstBlock,
          toBlock: endBlock
        }).get((err, events) => {
          callsDone+=1
          console.log("Sync done: " + callsDone + " out of :" +  totalCalls)
          err ? reject(err) : resolve(events);
        });
      })
    );
    firstBlock = endBlock
    endBlock += step
  }
  return results
};

const syncPastRecords = (recordsEvent, linnia) => {
  return Promise.all(getPastEvents(recordsEvent)).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    let totalRecords = events.length;
    let count = 0;
    console.log("Storing " + totalRecords + " records")
    return Promise.all(events.map((event) => {
      return linnia.getRecord(event.args.dataHash)
        .then(record => serializeRecord(event, record))
        .then(record => {

          // Show logs
          count+=1;
          if(count%20 == 0){
            console.log("Stored " + count + " records, out of: " + totalRecords);
          }

          // Add record to DB
          Record.findOrCreate({
            where: record
          })
        }
      );
    }));
  });
};

const syncPastPermissions = (permissionsEvent, linnia) => {
  return Promise.all(getPastEvents(permissionsEvent)).then(eventsArrays => {
    let events = [].concat.apply([], eventsArrays);
    let totalPermissions = events.length;
    let count = 0;
    console.log("Storing " + totalPermissions + " permissions")
    return Promise.all(events.map((event) => {
      return linnia.getPermission(event.args.dataHash, event.args.viewer)
        .then(per => serializePermission(event, per))
        .then(permission => {

          // Show logs
          count+=1;
          if(count%20 == 0){
            console.log("Stored " + count + " permissions, out of: " + totalPermissions);
          }

          // Add permission to DB
          permission.canAccess && Permission.findOrCreate({
            where: permission
          })}
        );
    }));
  });
};

const syncPastUsers = (usersEvent) => {
  let totalUsers, count;
  return Promise.all(getPastEvents(usersEvent)).then(eventsArrays => {
      let events = [].concat.apply([], eventsArrays);
      totalUsers = events.length;
      count = 0;
      console.log("Storing " + totalUsers + " users")
      return events.map(serializeUser)
    })
    .then(users => Promise.all(users.map((user) => {
      // Show logs
      count+=1;
      if(count%20 == 0){
        console.log("Stored " + count + " users, out of: " + totalUsers);
      }

      // Add users to DB
      return User.findOrCreate({ where: user });
    })));
};

const panic = (err) => {
  console.error('Sync failed!');
  console.error(err);
  process.exit(1);
};