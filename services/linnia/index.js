const Web3 = require('web3');
const Linnia = require('linnia');
const IPFS = require('ipfs-api');
const config = require('./config');

const websocketProvider = new Web3.providers.WebsocketProvider(config.websocketProvider);
const ipfs = new IPFS(config.ipfs);
const web3 = new Web3(websocketProvider);
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
