/**
 * Get all records of a patient
 */

const eutil = require('ethereumjs-util')
const { pool, recordsContract } = require('../../config')

module.exports = async (req, res) => {
  // add 0x prefix if not already prefixed
  const patientAddr = eutil.addHexPrefix(req.params.patientAddress)
    .toLowerCase()
  // check if address is valid
  if (!eutil.isValidAddress(patientAddr)) {
    res.json({ error: 'invalid address' })
    return
  }
  // trim 0x prefix in query
  try {
    const qResult = await pool.query(`SELECT hash FROM records
    WHERE patient = $1`, [patientAddr.slice(2)])
    res.json(qResult.rows)
  } catch (err) {
    res.json({ error: 'query error' }, 500)
  }
}
