const config = {
  ipfs: {
    host: process.env.LINNIA_IPFS_HOST,
    port: process.env.LINNIA_IPFS_PORT,
    protocol: process.env.LINNIA_IPFS_PROTOCOL
  },
  linnia: {
    hubAddress: process.env.LINNIA_HUB_ADDRESS
  },
  websocketProvider: process.env.LINNIA_ETH_PROVIDER
};

module.exports = config;
