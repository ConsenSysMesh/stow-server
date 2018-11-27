module.exports = (sequelize, DataTypes) => {
  const Attestation = sequelize.define('attestation', {
    dataHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attester: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('attester', val.toLowerCase());
      }
    }
  });

  return Attestation;
};
