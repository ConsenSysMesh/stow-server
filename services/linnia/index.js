const Web3 = require('web3');
const Linnia = require('linnia');
const IPFS = require('ipfs-api');
const { Subject } = require('rxjs');
const config = require('./config');

const httpProvider = new Web3.providers.HttpProvider(config.httpProvider);
const ipfs = new IPFS(config.ipfs);
const web3 = new Web3(httpProvider);
const linnia = new Linnia(web3, ipfs, config.linnia);

const eventsToTrack = [{
  name: 'LogRecordAdded',
  contract: 'records'
}, {
  name: 'LogAccessGranted',
  contract: 'permissions'
}, {
  name: 'LogUserRegistered',
  contract: 'users'
}, {
  name: 'LogAccessRevoked',
  contract: 'permissions'
}];

const _initialize = () => {
  return linnia.getContractInstances()
    .then(getEvents);
};

const getEvent = (model, contracts) => {
  const eventName = eventNames[model];
  const contract = contracts[model];
  const event = contract[eventName];
  return event;
};

const getEvents = (contracts) => {
  const events = {};
  eventsToTrack.forEach((event) => {
    const contract = contracts[event.contract];
    events[event.name] = contract[event.name];
  });
  return events;
};

module.exports = {
  initialize: () => _initialize().then(events => Object.assign(linnia, { events }))
};
