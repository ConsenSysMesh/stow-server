module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    address: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      set(val) {
        this.setDataValue('address', val.toLowerCase());
      }
    }
  });

  return User;
};
