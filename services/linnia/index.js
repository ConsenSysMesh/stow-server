const Web3 = require('web3');
const Linnia = require('linnia');
const IPFS = require('ipfs-api');
const { Subject } = require('rxjs');
const config = require('./config');

const httpProvider = new Web3.providers.HttpProvider(config.httpProvider);
const ipfs = new IPFS(config.ipfs);
const web3 = new Web3(httpProvider);
const linnia = new Linnia(web3, ipfs, config.linnia);

const eventNames = {
  records: 'LogRecordAdded',
  permissions: 'LogAccessGranted',
  users: 'LogUserRegistered'
};

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
  const models = Object.keys(eventNames);
  models.forEach((model) => {
    events[model] = getEvent(model, contracts);
  });
  return events;
};

module.exports = {
  initialize: () => _initialize().then(events => Object.assign(linnia, { events }))
};
