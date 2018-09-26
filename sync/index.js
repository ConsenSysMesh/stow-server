const stayInSync = require('./stayInSync');
const syncPastEvents = require('./syncPastEvents');

const initialize = async(linnia) => {
  let blockNumber = await linnia.web3.eth.getBlockNumber();
  syncPastEvents(linnia, blockNumber).then(() => stayInSync(linnia));
};

module.exports = {
  initialize
};
