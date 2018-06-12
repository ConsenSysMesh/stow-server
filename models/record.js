module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    dataHash: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    owner: { type: DataTypes.STRING, allowNull: false },
    metadata: { type: DataTypes.STRING, allowNull: false },
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
