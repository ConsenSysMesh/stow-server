module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('permission', {
    viewer: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('viewer', val.toLowerCase());
      }
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('owner', val.toLowerCase());
      }
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
