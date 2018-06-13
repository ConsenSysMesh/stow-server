const Web3 = require('web3');
const Linnia = require('linnia');
const IPFS = require('ipfs-api');
const { Subject } = require('rxjs');
const config = require('./config');

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

const subscribe = (contractName, eventName) => {
  const contract = _contracts[contractName];
  const event = contract[eventName];
  const source = sources[contractName];

  event().watch((err, event) => {
    if (!err) {
      source.next(event.args);
    }
  });
};

const connect = () => {
  subscribe('records', 'LogRecordAdded');
  subscribe('permissions', 'LogAccessGranted')
  subscribe('users', 'LogUserRegistered');
};

module.exports = {
  records$,
  permissions$,
  users$,
  initialize
};
