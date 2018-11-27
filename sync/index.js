const stayInSync = require('./stayInSync');
const syncPastEvents = require('./syncPastEvents');

const initialize = async stow => {
  let blockNumber = await stow.web3.eth.getBlockNumber();
  syncPastEvents(stow, blockNumber).then(() => stayInSync(stow));
};

module.exports = {
  initialize
};
