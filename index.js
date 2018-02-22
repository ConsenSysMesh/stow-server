const TruffleContract = require('truffle-contract')
const server = require('./server')

// load config
require('./config')
// start jobs
require('./jobs/watch-record-add')

server.start()
