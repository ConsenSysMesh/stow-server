const { bigNumberToNumber } = require('./../utils/types');

const serializeRecord = (recordEvent, record) => {
  return {
    owner: record.owner,
    sigCount: bigNumberToNumber(record.sigCount),
    irisScore: bigNumberToNumber(record.irisScore),
    dataHash: record.dataHash,
    dataUri: record.dataUri,
    metadata: recordEvent.args.metadata
  };
};

const serializeUser = (userEvent) => {
  return {
    address: userEvent.args.user
  };
};

const serializePermission = (permissionEvent) => {
  return {
    dataHash: permissionEvent.args.dataHash,
    userAddress: permissionEvent.args.viewer
  }
};

module.exports = {
  serializeRecord,
  serializeUser,
  serializePermission
};
