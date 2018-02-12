/**
 * Watch upload events emitted by LinniaRecords contract,
 * then update the database
 */

const { web3, recordsContract, pool } = require('../config')
let filter;

const setupFilter = async () => {
  const records = await recordsContract.deployed()
  filter = records.RecordAdded({
    // TODO: remember the last block watched so we don't re-add
    // everything when server restarts
    fromBlock: 0,
  })
  filter.watch(async (err, res) => {
    if (!err) {
      const fileHash = res.args.fileHash
      // retrieve the metadata
      const metadata = await records.records(fileHash)
      const [patient, sigCount, recordType, ipfsHash, timestamp] = metadata
      // upsert the record
      await pool.query(`INSERT INTO
        records(hash, patient, record_type, ipfs_hash,
          block_time)
        VALUES($1, $2, $3, $4, to_timestamp($5))
        ON CONFLICT (hash) DO UPDATE SET
          patient = $2, record_type = $3, ipfs_hash = $4,
          block_time = to_timestamp($5);`, [
          // trim the leading "0x" in hex-encoded strings
          fileHash.slice(2), patient.slice(2), recordType.toNumber(),
          ipfsHash.slice(2), timestamp.toNumber(),
        ],
      )
    }
  })
}

try {
  setupFilter();
} catch (err) {
  console.error(err)
}
