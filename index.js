const express = require('express')
const app = express()
const port = process.env.LINNIA_PORT

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port || 3000, () => console.log('Example app listening on port 3000!'))
