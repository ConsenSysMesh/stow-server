const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.load()
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: 'linnia',
})

const initTables = async () => {
  console.log("Creating tables")
  await pool.query(`CREATE TABLE IF NOT EXISTS records(
    hash char(64) PRIMARY KEY,
    patient char(40),
    record_type integer,
    ipfs_hash char(64),
    block_time timestamp);`
  )
  pool.end()
  console.log('Done')
}

initTables()
