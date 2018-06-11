module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    dataHash: { type: DataTypes.STRING, primaryKey: true },
    owner: DataTypes.STRING,
    metadata: DataTypes.STRING,
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
