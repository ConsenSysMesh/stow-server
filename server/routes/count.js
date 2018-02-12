/**
 * Count the number of records indexed in the DB
 */
const { pool } = require('../../config')

module.exports = async (req, res) => {
  const result = await pool.query('SELECT COUNT(*) FROM records')
  res.json(result.rows[0])
}
