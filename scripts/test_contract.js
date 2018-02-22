const eutil = require('ethereumjs-util')
const multihashes = require('multihashes')
const bs58 = require('bs58')
const { web3, rolesContract, recordsContract } = require('../config')

// dummy file
const testFileContent = `{"foo":"bar","baz":42}`;
const testFileHash = eutil.bufferToHex(eutil.sha3(testFileContent));
const testIpfsHash = "QmUdsPEcQD4RgFV2g8QiEgrJedDBAkLWiZ1L4Xeh7cKaDK";
const testIpfsHashDecoded = eutil.bufferToHex(
  multihashes.decode(bs58.decode(testIpfsHash)).digest)
const patient = web3.eth.accounts[1]
const doctor1 = web3.eth.accounts[2]
const doctor2 = web3.eth.accounts[3]

const setupRoles = async () => {
  console.log("Registering roles")
  const roles = await rolesContract.deployed()
  await roles.registerPatient({ from: patient })
  await roles.registerDoctor(doctor1, { from: web3.eth.accounts[0] })
  await roles.registerDoctor(doctor2, { from: web3.eth.accounts[0] })
}

const setupRecords = async () => {
  const records = await recordsContract.deployed()
  const tx1 = await records.addRecordByDoctor(testFileHash, patient, 1,
    testIpfsHashDecoded,
    { from: doctor1, gas: 300000 })
  console.log(tx1)
}

const setup = async () => {
  await setupRoles()
  await setupRecords()
  console.log("Done")
}

setup()
