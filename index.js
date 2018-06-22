require('dotenv').config();

const api = require('./api');
const sync = require('./sync');
const linnia = require('./services/linnia');

api.initialize();

linnia.initialize().then(_linnia => sync.initialize(_linnia));


