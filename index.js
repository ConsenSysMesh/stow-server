require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.LINNIA_PORT;

app.get('/', require('./routes/helloWorld'));
app.get('/records', require('./routes/records'));
app.get('/recordsByOwner', require('./routes/recordsByOwner'));

app.listen(port || 3000, () => {
  console.log('Linnia Server ready for action.');
});
