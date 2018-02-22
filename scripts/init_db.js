const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.load()
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: 'postgres',
})

const initDB = async () => {
  console.log('Creating database')
  try {
    await pool.query('CREATE DATABASE linnia')
  } catch (err) {
    console.log(err)
  }
  pool.end()
  console.log('Done')
}

initDB()
