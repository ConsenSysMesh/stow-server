require('dotenv').config();

const api = require('./api');
const sync = require('./sync');
const stow = require('./services/stow');
const models = require('./models');

const isTesting = process.env.STOW_IS_TESTING;
const shouldNotSync = process.env.STOW_SHOULD_NOT_SYNC;
const shouldSync = !isTesting && !shouldNotSync;

models.initialize().then(() => {
  api.initialize();

  if (shouldSync) {
    stow.initialize().then(_stow => sync.initialize(_stow));
  }
});



