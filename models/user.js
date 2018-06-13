module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    address: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.Record, {
      through: models.Permission,
      as: 'permissionedRecords',
      otherKey: 'dataHash',
      sourceKey: 'address'
    });
  };

  return User;
};
