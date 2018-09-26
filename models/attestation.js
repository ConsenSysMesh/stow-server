module.exports = (sequelize, DataTypes) => {
  const Attestation = sequelize.define('attestation', {
    dataHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attestator: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('attestator', val.toLowerCase());
      }
    }
  });

  return Attestation;
};
