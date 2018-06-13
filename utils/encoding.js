const multihashes = require('multihashes');

const hexEncodedBytesToIPFSHash = (bytes) => {
  const truncated = bytes.substring(2, bytes.length);
  const buffer = Buffer.from(truncated, "hex");
  const encoded = multihashes.encode(buffer, 18)
  const bs58String = multihashes.toB58String(encoded);
  return bs58String;
};

module.exports = {
  hexEncodedBytesToIPFSHash
};
