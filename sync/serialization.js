const { bigNumberToNumber } = require('./../utils/types');

const serializeRecord = (recordEvent, record) => {
  return {
    owner: record.owner.toLowerCase(),
    sigCount: bigNumberToNumber(record.sigCount),
    irisScore: bigNumberToNumber(record.irisScore),
    dataHash: record.dataHash,
    dataUri: record.dataUri,
    metadata: recordEvent.args.metadata
  };
};

const serializeSigUpdate = (sigCount, irisScore) => {
  return {
    sigCount: bigNumberToNumber(sigCount),
    irisScore: bigNumberToNumber(irisScore)
  };
};

const serializeAttestation = (attestationEvent) => {
  return {
    dataHash: attestationEvent.args.dataHash,
    attestator: attestationEvent.args.attestator.toLowerCase()
  };
};

const serializeUser = (userEvent) => {
  return {
    address: userEvent.args.user.toLowerCase()
  };
};

const serializePermission = (permissionEvent, permission) => {
  return {
    dataHash: permissionEvent.args.dataHash,
    viewer: permissionEvent.args.viewer.toLowerCase(),
    owner: permissionEvent.args.owner.toLowerCase(),
    dataUri: permission.dataUri,
    canAccess: permission.canAccess
  };
};

module.exports = {
  serializeRecord,
  serializeUser,
  serializePermission,
  serializeSigUpdate,
  serializeAttestation
};
