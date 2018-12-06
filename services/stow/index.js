const Web3 = require('web3');
const Stow = require('@stowprotocol/stow-js');
const IPFS = require('ipfs-api');
const config = require('./config');
const stayInSync = require('../../sync/stayInSync');
const { hubAddress, websocketProvider } = config;

var provider = new Web3.providers.WebsocketProvider(websocketProvider);
var web3 = new Web3(provider);
var stow = new Stow(web3, { hubAddress });

const eventsToTrack = [{
  name: 'StowRecordAdded',
  contract: 'records'
}, {
  name: 'StowAccessGranted',
  contract: 'permissions'
}, {
  name: 'StowUserRegistered',
  contract: 'users'
}, {
  name: 'StowAccessRevoked',
  contract: 'permissions'
}, {
  name: 'StowRecordSigAdded',
  contract: 'records'
}];

const _initialize = () => {
  // Keep connection alive
  web3._provider.on('end', (eventObj) => {
    console.log("WS disconnected. Reconnecting...")
    provider = new Web3.providers.WebsocketProvider(config.websocketProvider);
    web3 = new Web3(provider);
    stow = new Stow(web3, { hubAddress });
    _initialize().then(events => Object.assign(stow, { events })).then((l) => stayInSync(l))
  });

  return stow
    .getContractInstances()
    .then(getEvents);
};

const getEvents = (contracts) => {
  const events = {};
  eventsToTrack.forEach((_event) => {
    const contract = contracts[_event.contract];
    let event = contract[_event.name];
    events[_event.name] = fixWatch(event, _event.name, contract);
  });
  return events;
};

// Hacks to make event watching work without totally refactoring library
const fixWatch = (event, name, contract) => {
  const web3Contract = new web3.eth.Contract(contract.abi, contract.address);

  event.watch = (callback) => {
    web3Contract.events[name]().on('data', callback)
  };

  return event;
}

module.exports = {
  initialize: () => _initialize().then(events => Object.assign(stow, { events }))
};
