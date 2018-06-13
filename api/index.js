const express = require('express');
const app = express();
const port = process.env.LINNIA_PORT;
const bodyParser = require('body-parser');

const initialize = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/records', require('./records'));
  app.get('/users/:userAddress/permissioned-records', require('./recordsByPermission'));

  app.listen(port || 3000, () => {
    console.log('Linnia Database ready for action.');
  });
};

module.exports = {
  initialize
};

