require('dotenv').config();
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const isTesting = process.env.LINNIA_IS_TESTING;

const name = isTesting ? process.env.LINNIA_DB_TEST_NAME : process.env.LINNIA_DB_NAME;
const user = isTesting ? process.env.LINNIA_DB_TEST_USERNAME : process.env.LINNIA_DB_USERNAME;
const password = isTesting ? process.env.LINNIA_DB_TEST_PASSWORD : process.env.LINNIA_DB_PASSWORD;
const host = process.env.LINNIA_DB_HOST || 'localhost';
const port = process.env.LINNIA_DB_PORT || 5432;
const dialect = process.env.LINNIA_DB_DIALECT || 'postgres';
const logging = process.env.LINNIA_DB_LOGGING || false;
const operatorsAliases = false;
const force = true;

const sequelize = new Sequelize(name, user, password, {
  host,
  port,
  dialect,
  logging,
  operatorsAliases
});

let models = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    const name = model.name.charAt(0).toUpperCase() + model.name.slice(1);
    models[name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.initialize = () => sequelize.sync({ force })

module.exports = models;
