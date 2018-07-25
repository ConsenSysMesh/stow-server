const Web3 = require('web3');
const Linnia = require('@linniaprotocol/linnia-july-2018');
const IPFS = require('ipfs-api');
const config = require('./config');
const stayInSync = require('../../sync/stayInSync');

var websocketProvider = new Web3.providers.WebsocketProvider(config.websocketProvider);
const ipfs = new IPFS(config.ipfs);
var web3 = new Web3(websocketProvider);
var linnia = new Linnia(web3, ipfs, config.linnia);

const eventsToTrack = [{
  name: 'LinniaRecordAdded',
  contract: 'records'
}, {
  name: 'LinniaAccessGranted',
  contract: 'permissions'
}, {
  name: 'LinniaUserRegistered',
  contract: 'users'
}, {
  name: 'LinniaAccessRevoked',
  contract: 'permissions'
}];

const _initialize = () => {
  // Keep connection alive
  web3._provider.on('end', (eventObj) => {
    console.log("WS disconnected. Reconnecting...")
    websocketProvider = new Web3.providers.WebsocketProvider(config.websocketProvider);
    web3 = new Web3(websocketProvider);
    linnia = new Linnia(web3, ipfs, config.linnia);
    _initialize().then(events => Object.assign(linnia, { events })).then( (l) => stayInSync(l))
  });

  return linnia.getContractInstances()
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
  initialize: () => _initialize().then(events => Object.assign(linnia, { events }))
};
