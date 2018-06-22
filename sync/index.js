const linnia = require('./../services/linnia');
const stayInSync = require('./stayInSync');
const syncPastEvents = require('./syncPastEvents');

const initialize = (linnia) => {
  syncPastEvents(linnia).then(() => stayInSync(linnia));
};

module.exports = {
  initialize
};

