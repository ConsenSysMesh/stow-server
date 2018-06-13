const { hexEncodedBytesToIPFSPath } = require('./../utils/encoding');

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    dataHash: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    metadata: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataUri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    irisScore: DataTypes.INTEGER,
    sigCount: DataTypes.INTEGER,
    ipfsPath: {
      type: DataTypes.VIRTUAL,
      get: function() {
        const ipfsHash = hexEncodedBytesToIPFSPath(this.dataUri);
        return ipfsHash;
      }
    }
  }, {
    indexes: [
      {
        unique: false,
        fields: ['owner']
      },
      {
        unique: true,
        fields: ['dataHash']
      },
    ]
  });

  return Record;
};
