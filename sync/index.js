const stayInSync = require('./stayInSync');
const syncPastEvents = require('./syncPastEvents');
const Web3 = require('web3');
const config = require('../services/linnia/config');
let websocketProvider = new Web3.providers.WebsocketProvider(config.websocketProvider);
let web3 = new Web3(websocketProvider);

const initialize = async (linnia) => {
  let blockNumber = await web3.eth.getBlockNumber();
  syncPastEvents(linnia, blockNumber).then(() => stayInSync(linnia));
};

module.exports = {
  initialize
};

