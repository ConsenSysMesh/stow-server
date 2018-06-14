const Web3 = require('web3');
const Linnia = require('linnia');
const IPFS = require('ipfs-api');
const { Subject } = require('rxjs');
const config = require('./config');
const { bigNumberToNumber } = require('./../../utils/types');

const httpProvider = new Web3.providers.HttpProvider(config.httpProvider);
const ipfs = new IPFS(config.ipfs);
const web3 = new Web3(httpProvider);
const linnia = new Linnia(web3, ipfs, config.linnia);

const sources = {
  records: new Subject(),
  permissions: new Subject(),
  users: new Subject()
};

const records$ = sources.records.asObservable();
const permissions$ = sources.permissions.asObservable();
const users$ = sources.users.asObservable();

let _contracts;

const initialize = () => {
  return setContracts().then(connect);
};

const setContracts = () => {
  return linnia
    .getContractInstances()
    .then((contracts) => {
      _contracts = contracts;
      return contracts;
    });
};


// hacks until the library does this for us!!!

const marshall = {
  records: (original) => {
    return (array) => {
      return {
        owner: array[0],
        sigCount: bigNumberToNumber(array[2]),
        irisScore: bigNumberToNumber(array[3]),
        dataHash: original.dataHash,
        dataUri: array[4],
        metadata: original.metadata
      };
    };
  },
  users: (original) => {
    return (array) => {
      return {
        address: original.user,
        provenance: bigNumberToNumber(array[2])
      };
    };
  }
};

const subscribe = (resource, eventName, index) => {
  const contract = _contracts[resource];
  const event = contract[eventName];
  const source = sources[resource];

  event().watch((err, event) => {
    if (!err) {
      const originalEvent = event.args;

      if (index) {
        const indexValue = originalEvent[index];

        contract[resource](indexValue)
          .then(marshall[resource](originalEvent))
          .then((marshalled) => source.next(marshalled));

      } else {
        source.next(originalEvent);
      }
    }
  });
};

const connect = () => {
  subscribe('records', 'LogRecordAdded', 'dataHash');
  subscribe('permissions', 'LogAccessGranted')
  subscribe('users', 'LogUserRegistered', 'user');
};

module.exports = {
  records$,
  permissions$,
  users$,
  initialize
};
