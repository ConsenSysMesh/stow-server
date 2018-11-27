const express = require('express');
const app = express();
const port = process.env.LINNIA_PORT;
const bodyParser = require('body-parser');
const errorHandler = require('./errorHandler');
const cors = require('cors');

const initialize = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.get('/records', require('./records'));
  app.get('/records/:dataHash', require('./recordByDataHash'));
  app.get('/users/:address/permissions', require('./getPermissionsByUser'));
  app.get('/attestations/:dataHash', require('./attestations'));

  app.use(errorHandler);

  app.listen(port || 3000, () => {
    console.log('Linnia Database ready for action.');
  });
};

module.exports = {
  initialize
};
