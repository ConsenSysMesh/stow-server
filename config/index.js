const dotenv = require('dotenv')
const { Pool } = require('pg')
const Web3 = require('web3')
const contract = require('truffle-contract')

const web3Provider = process.env.WEB3_PROVIDER || 'http://localhost:7545'

dotenv.load()
const web3 = new Web3(
  new Web3.providers.HttpProvider(web3Provider))
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: 'linnia',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
})

const hubContract = contract(require('../artifacts/LinniaHub.json'))
hubContract.setProvider(web3.currentProvider)
const rolesContract = contract(require('../artifacts/LinniaRoles.json'))
rolesContract.setProvider(web3.currentProvider)
const recordsContract = contract(require('../artifacts/LinniaRecords.json'))
recordsContract.setProvider(web3.currentProvider)

module.exports = {
  web3,
  pool,
  hubContract,
  rolesContract,
  recordsContract,
}
