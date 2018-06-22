require('dotenv').config();

const api = require('./api');
const sync = require('./sync');
const linnia = require('./services/linnia');

const isTesting = process.env.LINNIA_IS_TESTING;
const shouldNotSync = process.env.LINNIA_SHOULD_NOT_SYNC;
const shouldSync = !isTesting && !shouldNotSync;

api.initialize();

if (shouldSync) {
  linnia.initialize().then(_linnia => sync.initialize(_linnia));
}


