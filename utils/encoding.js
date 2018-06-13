const multihashes = require('multihashes');
const bs58 = require('bs58');
const eutil = require('ethereumjs-util');

const hexEncodedBytesToIPFSPath = (bytes) => {
  const buffer = eutil.toBuffer(bytes);
  const encoded = multihashes.encode(buffer, 18, 32)
  const bs58String = bs58.encode(encoded);
  return bs58String;
};

module.exports = {
  hexEncodedBytesToIPFSPath
};
