/**
 * Homepage of the API server
 * Show the address of the contracts
 */
const { hubContract, rolesContract, recordsContract } = require('../../config')

module.exports = async (req, res) => {
  const [hubInst, rolesInst, recordsInst] = await Promise.all([
    hubContract.deployed(), rolesContract.deployed(),
    recordsContract.deployed()]);
  res.json({
    "HubAddress": hubContract.address,
    "RolesAddress": rolesContract.address,
    "RecordsAddress": recordsContract.address,
  })
}
