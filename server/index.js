const express = require('express')
const app = express()

const startServer = () => {
  app.get('/', require('./routes/home'))
  app.get('/count', require('./routes/count'))
  app.get('/records/patient/:patientAddress',
    require('./routes/records-by-patient'))
  app.listen(3000, () => console.log('Listening on port 3000'))
}

module.exports = {
  start: startServer,
}
