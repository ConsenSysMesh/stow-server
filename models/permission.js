module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    viewer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    canAccess: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dataUri: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Permission;
};
