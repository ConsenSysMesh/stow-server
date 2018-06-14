module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    userAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Permission;
};
