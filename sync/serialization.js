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

const serializePermission = (permissionEvent, permission) => {
  return {
    dataHash: permissionEvent.args.dataHash,
    viewer: permissionEvent.args.viewer,
    owner: permissionEvent.args.owner,
    dataUri: permission.dataUri,
    canAccess: permission.canAccess
  };
};

module.exports = {
  serializeRecord,
  serializeUser,
  serializePermission
};
